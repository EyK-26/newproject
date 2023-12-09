<?php

namespace App\Http\Controllers;

use App\Models\Answer as ModelsAnswer;
use App\Models\User;
use App\Notifications\Answer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnswerController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        if (Auth::check() && Auth::user()->role === 'admin') {
            $this->validate($request, ['text' => 'required']);
            $user = Auth::user();
            $enquiry = $request->input('enquiry');
            $text = $request->input('text');
            $decoded_enquriy = json_decode($enquiry);
            $client = User::find($decoded_enquriy->user->id);
            $this->store_model($user->id,  $client->id, $decoded_enquriy->id, $decoded_enquriy->product_id, $text);
            $client->notify(new Answer($user, $text, $decoded_enquriy, $decoded_enquriy->created_at));
            return redirect()->back()->with('message', 'Your answer has been sent.');
        }
    }

    private function store_model(int $user_id, int $client_id, int $enquiry_id, int $product_id, string $text): void
    {
        $answer = new ModelsAnswer();
        $answer->fill(['user_id' => $user_id, 'client_id' => $client_id, 'enquiry_id' => $enquiry_id, 'product_id' => $product_id]);
        $answer->message = $text;
        $answer->save();
    }
}
