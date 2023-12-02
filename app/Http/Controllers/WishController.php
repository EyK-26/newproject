<?php

namespace App\Http\Controllers;

use App\Models\Wish;
use Illuminate\Http\Request;

class WishController extends Controller
{
    public function store(Request $request): array
    {
        $added_product = Wish::query()
            ->where('user_id', $request->user_id)
            ->where('product_id', $request->product_id)
            ->first();
            
        if (!$this->check($request->user_id, $request->product_id)) {
            $added_product->truncate();
            return ['message' => 'removed from wishlist'];
        } else {
            $wish = new Wish();
            $wish->user_id = $request->user_id;
            $wish->product_id = $request->product_id;
            $wish->save();
            return ['message' => 'added to wishlist'];
        }
    }

    public function check($user_id, $product_id): bool
    {
        $added_product = Wish::query()
            ->where('user_id', $user_id)
            ->where('product_id', $product_id)
            ->first();
        return empty($added_product);
    }
}
