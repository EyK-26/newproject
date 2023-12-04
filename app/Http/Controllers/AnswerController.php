<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\Answer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnswerController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        if (Auth::check()) {
            $this->validate($request, ['text' => 'required']);
            $user = Auth::user();
            $enquiry = $request->input('enquiry');
            $text = $request->input('text');

            $decoded_enquriy = json_decode($enquiry);
            $client = User::findOrFail($decoded_enquriy->user->id);
            $client->notify(new Answer($user, $text, $decoded_enquriy, $decoded_enquriy->created_at));

            return redirect()->back()->with('message', 'Your answer has been sent.');
        }
    }
}
