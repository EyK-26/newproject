<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\QuizAnswer;
use App\Models\User;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuestionController extends Controller
{
    public function create(): View
    {
        $user = User::where('id', Auth::user()->id)->first();
        if ($user->hasRole("admin")) {
            return view('admin.question', compact('user'));
        } else {
            abort(404);
        }
    }

    public function store(Request $request)
    {
        $question = new Question;
        $question->text = $request->text;
        for ($i = 0; $i < count($request->quizanswers); $i++) {
            $quizanswer = new QuizAnswer;
            $quizanswer->text = $request->quizanswers[$i];
            if ($request->quizanswers_correct[$i] === 'on') {
                $quizanswer->is_correct === true;
            }
        }
    }

    public function show(Request $request): Collection | array
    {
        $user_id = $request->query('user_id');
        $auth_user = Auth::user();
        if ($user_id === 0 && empty($auth_user)) {
            return Question::orderBy("id", "asc")->where('is_passed', false)->with('quizanswers')->first() ?? null;
        } else if ($user_id !== 0 && intval($auth_user) === intval($user_id)) {
            return Question::where('user_id', $user_id)->orderBy("id", "asc")->where('is_passed', false)->with('quizanswers')->first() ?? null;
        } else {
            return [];
        }
    }
}
