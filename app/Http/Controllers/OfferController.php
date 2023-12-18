<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OfferController extends Controller
{
    public function index(Request $request): View
    {
        $user = Auth::user();
        if (!empty($user) && $user->role === "admin") {
            $offers = Offer::orderBy("created_at", "desc")->paginate(1);
            return view('admin.offers', compact("user", "offers"));
        } else {
            return abort(404);
        }
    }
    public function create(): View
    {
        $user = Auth::user();
        if (!empty($user) && $user->role === "admin") {
            return view("admin.offer", compact("user"));
        } else {
            return abort(404);
        }
    }

    public function store(Request $request): RedirectResponse|array
    {
        if (Auth::check() && Auth::user()->role === 'admin') {
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
                return redirect('/offers')->with('message', 'New property offer has been added');
            } else {
                $offer->save();
                return redirect('/offers')->with('message', 'New property offer has been added. 
            Please consider to add photos a better experience.');
            }
        } else {
            return ['message' => '404, not authorized'];
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
