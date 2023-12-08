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
            $added_product->delete();
            return ['message' => 'removed from wishlist'];
        } else {
            $wish = new Wish();
            $wish->fill(['user_id' => $request->user_id, 'product_id' => $request->product_id]);
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

    private function flatten(array $products): array
    {
        $new_array = array();
        array_walk_recursive($products, function ($array) use (&$new_array) {
            $new_array[] = $array;
        });
        return $new_array;
    }

    public function show(Request $request): array
    {
        $wishlist_products = Wish::where('user_id', $request->id)->select('product_id')->get()->toArray();
        if ($wishlist_products) {
            return $this->flatten($wishlist_products);
        } else {
            return ['message' => 'Your wishlist is empty.'];
        }
    }

    public function is_added(Request $request): bool
    {
        return !$this->check($request->user_id, $request->product_id);
    }
}
