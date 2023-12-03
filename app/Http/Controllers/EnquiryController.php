<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use App\Models\User;
use App\Notifications\NotificationEnquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class EnquiryController extends Controller
{
    public function store(Request $request)
    {
        $wish = new Enquiry();
        $wish->fill(['user_id' => $request->user_id, 'product_id' => $request->product_id]);
        $wish->message = $request->message;
        $wish->save();
        $this->notify($request->user_id, $request->message, $request->product_id);
        return ['message' => 'message sent'];
    }

    public function notify(int $user_id, string $message, int $product_id): void
    {
        $user = User::findOrFail($user_id);
        Notification::send($user, new NotificationEnquiry($user, $message, $product_id));
    }
}
