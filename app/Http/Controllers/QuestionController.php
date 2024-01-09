<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\QuizAnswer;
use App\Models\User;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuestionController extends Controller
{
    public function index(Request $request): View | RedirectResponse
    {
        try {
            $user = User::where('id', Auth::user()->id)->first();
            $questions = Question::orderBy("updated_at", "desc")->with('quizanswers')->paginate(10);
            return count($questions) > 0 ? view('admin.questions', compact('questions', 'user'))
                : redirect('/questions')->with('message', 'no question in DB, create something.');
        } catch (ModelNotFoundException $e) {
            return redirect('/')->with('message_success', $e->getMessage());
        }
    }

    public function create(): View
    {
        $user = User::where('id', Auth::user()->id)->first();
        if ($user->hasRole("admin")) {
            return view('admin.question', compact('user'));
        } else {
            abort(404);
        }
    }

    public function edit(string $id): View
    {
        $user = User::where('id', Auth::user()->id)->first();
        $question = Question::findOrFail($id);
        if ($user->hasRole("admin")) {
            return view('admin.question', compact('user', 'question'));
        } else {
            abort(404);
        }
    }

    public function store(Request $request): RedirectResponse
    {
        $question = new Question;
        $question->text = $request->text;
        $question->save();
        for ($i = 0; $i < count($request->quizanswers); $i++) {
            $quizanswer = new QuizAnswer;
            $quizanswer->question_id = $question->id;
            $quizanswer->text = $request->quizanswers[$i];
            if (isset($request->quizanswers_correct[$i])) {
                $quizanswer->is_correct = $request->quizanswers_correct[$i] === 'on';
            }
            $quizanswer->save();
        }
        return redirect('/questions-all')->with('message', 'question has been added');
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        try {
            $question = Question::findOrFail($id);
            $question->text = $request->text;
            $question->save();
            $quizanswers = QuizAnswer::where('question_id', $id)->get();
            for ($i = 0; $i < count($request->quizanswers); $i++) {
                $quizanswers[$i]->text = $request->quizanswers[$i];
                if (isset($request->quizanswers_correct[$i])) {
                    $quizanswers[$i]->is_correct = $request->quizanswers_correct[$i] === 'on';
                } else {
                    $quizanswers[$i]->is_correct = false;
                }
                $quizanswers[$i]->save();
            }
            return redirect()->back()->with('message', 'question has been updated!');
        } catch (ModelNotFoundException $e) {
            return redirect()->back()->with('message_error', $e->getMessage());
        }
    }

    public function show(Request $request): Question | array
    {
        $user_id = $request->query('user_id');
        if (empty($user_id)) {
            return ['message' => 'you have to login to do the quizzzzzzz'];
        } else {
            return Question::orderBy("id", "asc")
                ->with('quizanswers')
                ->whereHas('users', function ($query) use ($user_id) {
                    $query->where('user_id', $user_id)
                        ->where('is_passed', false);
                })->first();
        }
    }

    public function destroy(string $id): RedirectResponse
    {
        try {
            $question = Question::findOrFail($id);
            $question->delete();
            return redirect()->back()->with('message', 'question has been deleted!');
        } catch (ModelNotFoundException $e) {
            return redirect()->back()->with('message_error', $e->getMessage());
        }
    }
}
