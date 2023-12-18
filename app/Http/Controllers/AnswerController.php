<?php

namespace App\Http\Controllers;

use App\Models\Answer as ModelsAnswer;
use App\Models\Enquiry;
use App\Models\User;
use App\Notifications\Answer;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnswerController extends Controller
{
    public function store(Request $request): RedirectResponse|array
    {
        if (Auth::check() && Auth::user()->role === 'admin') {
            $this->validateAnswer($request);
            try {
                $enquiry = Enquiry::findOrFail($request->input('enquiry_id'));
                $this->store_model(Auth::user()->id, $enquiry->id, $enquiry->user->id, $enquiry->product_id, $request->input('message'));
                $enquiry->user->notify(new Answer(Auth::user(), $request->input('message'), $enquiry));
                return redirect()->back()->with('message', 'Your answer has been sent.');
            } catch (ModelNotFoundException $e) {
                return ['message' => 'record not found'];
            }
        } else {
            return ['message' => '404, not authorized'];
        }
    }

    private function store_model(int $user_id, int $enquiry_id, int $client_id, int $product_id, string $text): void
    {
        $answer = new ModelsAnswer();
        $answer->fill(['user_id' => $user_id, 'enquiry_id' => $enquiry_id, 'client_id' => $client_id, 'product_id' => $product_id]);
        $answer->message = $text;
        $answer->save();
    }

    private function validateAnswer(Request $request): void
    {
        $this->validate($request, [
            'enquiry_id' => 'required|exists:enquiries,id',
            'message' => 'required',
        ]);
    }
}
