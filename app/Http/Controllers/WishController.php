<?php

namespace App\Http\Controllers;

use App\Models\Wish;
use Illuminate\Http\Request;

class WishController extends Controller
{
    public function store(Request $request): void
    {
        $user_id = $request->user_id;
        $product_id = $request->product_id;
        $wish = new Wish();
        $wish->user_id = $user_id;
        $wish->product_id = $product_id;
        $wish->save();
    }
}
