<?php

namespace App\Http\Controllers;

use App\Models\Answer as ModelsAnswer;
use App\Models\Enquiry;
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
            $this->validateAnswer($request);
            $enquiry_id = $request->input('enquiry_id');
            $enquiry = Enquiry::findOrFail($enquiry_id);
            $this->store_model(Auth::user()->id, $enquiry->user_id, $enquiry->id, $enquiry->product_id, $request->input('text'));
            $enquiry->user->notify(new Answer(Auth::user(), $request->input('text'), $enquiry, $enquiry->created_at));
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

    private function validateAnswer(Request $request): void
    {
        $this->validate($request, [
            'enquiry_id' => 'required|exists:enquiries,id',
            'text' => 'required',
        ]);
    }
}
