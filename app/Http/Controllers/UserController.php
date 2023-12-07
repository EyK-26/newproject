<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function show(string $id): array
    {
        $user = User::findOrFail($id);
        return ['name' => $user->name, 'email' => $user->email, 'member_since' => $user->created_at];
    }

    public function update(Request $request,): array
    {
        $user = User::findOrFail($request->input('id'));
        if ($user->name === $request->input('name')) {
            return ['message' => 'Inserted name is the same as the current name'];
        } else {
            $user->name = $request->input('name');
            $user->save();
            return ['message' => 'User name has ben updated.'];
        }
    }

    public function destroy(Request $request): array
    {
        if (Auth::user()->id === $request->input('id')) {
            $user = User::findOrFail($request->input('id'));
            Auth::logout();
            $user->delete();
            return ['message' => 'Your Account has been deleted'];
        }
    }
}
