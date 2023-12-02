<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use Illuminate\Http\Request;

class EnquiryController extends Controller
{
    public function store(Request $request)
    {
        $wish = new Enquiry();
        $wish->fill(['user_id' => $request->user_id, 'product_id' => $request->product_id]);
        $wish->message = $request->message;
        $wish->save();
        return ['message' => 'message sent'];
    }
}
