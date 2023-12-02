<?php

namespace App\Http\Controllers;

use App\Models\Wish;
use Illuminate\Http\Request;

class WishController extends Controller
{
    public function store(Request $request): array
    {
        $user_id = $request->user_id;
        $product_id = $request->product_id;
        $added_product = Wish::query()
            ->where('user_id', $user_id)
            ->where('product_id', $product_id)
            ->first();
        if (!empty($added_product)) {
            $added_product->truncate();
            return ['message' => 'removed from wishlist'];
        } else {
            $wish = new Wish();
            $wish->user_id = $user_id;
            $wish->product_id = $product_id;
            $wish->save();
            return ['message' => 'added to wishlist'];
        }
    }
}
