<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuestionController extends Controller
{
    public function create(Request $request): Collection | array
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
