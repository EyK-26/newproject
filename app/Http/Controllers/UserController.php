<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function show(string $id): array
    {
        try {
            $user = User::findOrFail($id);
            return [
                'name' => $user->name,
                'email' => $user->email,
                'member_since' => $user->created_at,
            ];
        } catch (ModelNotFoundException $e) {
            return ['message' => 'User not found'];
        }
    }

    public function update(Request $request,): array
    {
        try {
            $user = User::findOrFail($request->input('id'));
            if ($user->name === $request->input('name')) {
                return ['message' => 'Inserted name is the same as the current name'];
            } else {
                $user->name = $request->input('name');
                $user->save();
                return ['message' => 'User name has ben updated.'];
            }
        } catch (ModelNotFoundException $e) {
            return ['message' => 'User not found'];
        }
    }

    public function destroy(Request $request): array
    {
        if (auth()->check() && auth()->user()->id === intval($request->input('id'))) {
            $user = User::find($request->input('id'));
            if ($user) {
                Auth::logout();
                $user->delete();
                return ['message' => 'Your Account has been deleted'];
            } else {
                return ['message' => 'User not found'];
            }
        }
        return ['message' => 'Unauthorized access'];
    }
}
