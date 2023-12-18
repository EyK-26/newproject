<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OfferController extends Controller
{
    public function create(): View
    {
        $user = Auth::user();
        if (!empty($user)) {
            return view("admin.offer", compact("user"));
        } else {
            return abort(404);
        }
    }

    public function store(Request $request): array
    {
        $this->validateOffer($request);
        $offer = new Offer();
        $offer->fill($request->except('photos'));
        $file_paths = [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->storeAs('photos',  $photo->getClientOriginalName(), 'uploads');
                $file_paths[] = $path;
            }
            $offer->photo_path = implode(',', $file_paths);
            $offer->save();
            return ['message' => 'New property offer has been added'];
        } else {
            $offer->save();
            return ['message' => 'New property offer has been added. Please consider to add photos a better experience.'];
        }
    }

    private function validateOffer(Request $request): void
    {
        $request->validate([
            'title' => 'required|string',
            'locality' => 'required|string',
            'description' => 'required|string',
            'photos.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
    }
}
