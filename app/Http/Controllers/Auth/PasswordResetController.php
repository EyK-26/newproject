<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PasswordResetController extends Controller
{
    public function reset(string $token, string $email)
    {
        return view('reset', compact('token', 'email'));
    }

    public function update(Request $request)
    {
        if ($request->input('password') !== $request->input('password_confirmation')) {

            return view('reset', compact('token', 'email'));
        }

        $user = User::where('email', $request->input('email'))->first();
        $user->password = Hash::make($request->input('password'));
        $user->save();
    }
}
