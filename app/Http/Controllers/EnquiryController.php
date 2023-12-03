<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use App\Models\User;
use App\Notifications\NotificationEnquiry;
use Illuminate\Http\Request;

class EnquiryController extends Controller
{
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

    protected function show_enquiry(string $id)
    {
        $enquiry = Enquiry::findORFail($id);
    }
}
