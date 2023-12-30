<?php

namespace App\Http\Controllers;

use App\Models\Wish;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class WishController extends Controller
{
    public function store(Request $request): array
    {
        $added_product = Wish::query()
            ->where('user_id', $request->user_id)
            ->where('offer_id', $request->offer_id)
            ->first();
        if (!$this->check($request->user_id, $request->offer_id)) {
            $added_product->delete();
            return ['message' => 'removed'];
        } else {
            $wish = new Wish();
            $wish->fill(['user_id' => $request->user_id, 'offer_id' => $request->offer_id]);
            $wish->save();
            return ['message' => 'added'];
        }
    }

    public function check($user_id, $offer_id): bool
    {
        $added_product = Wish::query()
            ->where('user_id', $user_id)
            ->where('offer_id', $offer_id)
            ->first();
        return empty($added_product);
    }

    // private function flatten(array $products): array
    // {
    //     $new_array = array();
    //     array_walk_recursive($products, function ($array) use (&$new_array) {
    //         $new_array[] = $array;
    //     });
    //     return $new_array;
    // }

    // public function index(Request $request): array
    // {
    //     $wishlist_products = Wish::where('user_id', $request->id)->select('offer_id')->get()->toArray();
    //     if (count($wishlist_products) > 0) {
    //         return $this->flatten($wishlist_products);
    //     } else {
    //         return ['message' => 'Your wishlist is empty.'];
    //     }
    // }

    public function index(Request $request): Collection | array
    {
        $wishlist_products = Wish::where('user_id', $request->query('id'))->get();
        if (!empty($wishlist_products)) {
            return $wishlist_products;
        } else {
            return ['message' => 'Your wishlist is empty.'];
        }
    }

    public function is_added(Request $request): bool
    {
        return !$this->check($request->user_id, $request->offer_id);
    }
}
