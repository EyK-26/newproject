<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Notifications\admin\TranslateCustomText;
use Carbon\Carbon;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OfferController extends Controller
{
    public function edit(string $id): View|RedirectResponse
    {
        try {
            $offer = Offer::findOrFail($id);
            $user = Auth::user();
            if (!empty($offer)) {
                return view('admin.offer', ['offer' => $offer, 'user' => $user]);
            } else {
                return redirect()->back()->with("error", "not found");
            }
        } catch (ModelNotFoundException $e) {
            return abort(404);
        }
    }
    public function update(Request $request, string $id): RedirectResponse
    {
        try {
            $offer = Offer::findOrFail($id);
            if (!empty($offer)) {
                $offer->fill($request->all())->save();
                return redirect()->back()->with("message", "update done");
            } else {
                return redirect()->back()->with("error", "not found");
            }
        } catch (ModelNotFoundException $e) {
            return abort(404);
        }
    }

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

    public function custom_offers(Request $request): array | Collection
    {
        $offers = Offer::orderBy("created_at", "desc")->get();

        if (!empty($offers)) {
            foreach ($offers as $offer) {
                $offer->title = TranslateCustomText::translate($offer->title);
                $offer->description = TranslateCustomText::translate($offer->description);
            }
            return $offers->load('user');
        } else {
            return ['message' => 'no property available'];
        }
    }

    // private function convert_datetime($datetime): string
    // {
    //     preg_match("/\d{4}-\d+-\d+/", $datetime, $matches);
    //     $split = preg_replace("/-/", "/", $matches[0]);
    //     return preg_replace('/^(\d{4})\/(\d{2})\/(\d{2})$/', '$3/$2/$1', $split);
    // }

    public function show(Request $request): array | Offer
    {
        try {
            $offer = Offer::findOrFail($request->query('id'));
            if (!empty($offer)) {
                $offer->title = TranslateCustomText::translate($offer->title);
                $offer->description = TranslateCustomText::translate($offer->description);
                return $offer->load('user');
            } else {
                return ['message' => 'no property available'];
            }
        } catch (ModelNotFoundException $e) {
            return ['message' => 'record not found'];
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
                    $path = $photo->storeAs('uploads',  $photo->getClientOriginalName());
                    $file_paths[] = $path;
                }
                $offer->photo_path = implode(', ', $file_paths);
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
