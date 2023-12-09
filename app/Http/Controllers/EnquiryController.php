<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use App\Models\User;
use App\Notifications\NotificationEnquiry;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnquiryController extends Controller
{
    public function index (Request $request) {
        
    }
    
    public function store(Request $request)
    {
        $enquiry = new Enquiry();
        $enquiry->fill(['user_id' => $request->user_id, 'product_id' => $request->product_id]);
        $enquiry->message = $request->message;
        $enquiry->save();
        $this->notify($request->user_id, $request->message, $request->product_id);
        return ['message' => 'message sent'];
    }

    private function notify(int $user_id, string $message, int $product_id): void
    {
        $user = User::findOrFail($user_id);
        $user->notify(new NotificationEnquiry($user, $message, $product_id));
    }

    public function show(string $product_id, string $user_id): View
    {
        $user = Auth::user();
        $client = User::findOrFail($user_id);
        $enquiry = Enquiry::query()
            ->where('user_id', $user_id)
            ->where('product_id', $product_id)
            ->first();
        $enquiry_id = $enquiry->id;
        return view('admin.enquiry', compact('enquiry', 'product_id', 'client', 'user', 'enquiry_id'));
    }

    public function answer(string $enquiry_id): View
    {
        $user = Auth::user();
        $enquiry = Enquiry::with('user')->findOrFail($enquiry_id);
        return view('admin.answer', compact('user', 'enquiry'));
    }
}
