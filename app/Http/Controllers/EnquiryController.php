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
    public function index(Request $request): Collection
    {
        $enquiry = Enquiry::with(['user', 'answers'])->where('user_id', $request->input('id'))->get();
        if ($enquiry) return $enquiry;
    }

    public function store(Request $request): array
    {
        $enquiry = new Enquiry();
        $enquiry->fill($request->all());
        $enquiry->save();
        $this->notify($request->user_id, $request->message, $request->product_id);
        return ['message' => 'message sent'];
    }

    private function notify(int $user_id, string $message, int $product_id)
    {
        try {
            $user = User::findOrFail($user_id);
            $user->notify(new NotificationEnquiry($user, $message, $product_id));
        } catch (ModelNotFoundException $e) {
            return ['message' => 'User not found'];
        }
    }

    public function show(string $product_id, string $user_id): View
    {
        try {
            $user = Auth::user();
            $client = User::findOrFail($user_id);
            $enquiry = Enquiry::query()
                ->where('user_id', $user_id)
                ->where('product_id', $product_id)
                ->firstOrFail();
            $enquiry_id = $enquiry->id;
            return view('admin.enquiry', compact('enquiry', 'product_id', 'client', 'user', 'enquiry_id'));
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
