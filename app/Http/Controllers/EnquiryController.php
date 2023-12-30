<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use App\Models\User;
use App\Notifications\NotificationEnquiry;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnquiryController extends Controller
{
    public function index(Request $request): Collection|View
    {
        $enquiry = Enquiry::with(['user', 'answers'])->where('user_id', $request->input('id'))->get();
        if (!empty($enquiry)) {
            return $enquiry;
        } else {
            return abort(404);
        }
    }

    public function store(Request $request): array
    {
        $enquiry = new Enquiry();
        $enquiry->fill($request->all());
        $enquiry->save();
        $this->notify($request->user_id, $request->message, $request->offer_id);
        return ['message' => 'message sent'];
    }

    private function notify(int $user_id, string $message, int $offer_id)
    {
        try {
            $user = User::findOrFail($user_id);
            $user->notify(new NotificationEnquiry($user, $message, $offer_id));
        } catch (ModelNotFoundException $e) {
            return ['message' => 'User not found'];
        }
    }

    public function show(string $offer_id, string $user_id): View|array
    {
        try {
            $user = Auth::user();
            $client = User::findOrFail($user_id);
            $enquiry = Enquiry::query()
                ->where('user_id', $user_id)
                ->where('offer_id', $offer_id)
                ->firstOrFail();
            $enquiry_id = $enquiry->id;
            return view('admin.enquiry', compact('enquiry', 'offer_id', 'client', 'user', 'enquiry_id'));
        } catch (ModelNotFoundException $e) {
            return ['message' => 'User not found'];
        }
    }

    public function answer(string $enquiry_id): View|array
    {
        try {
            $user = Auth::user();
            $enquiry = Enquiry::with('user')->findOrFail($enquiry_id);
            return view('admin.answer', compact('user', 'enquiry'));
        } catch (ModelNotFoundException $e) {
            return ['message' => 'Enquiry not found'];
        }
    }
}
