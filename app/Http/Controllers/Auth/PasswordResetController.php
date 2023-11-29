<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PasswordResetController extends Controller
{
    public function reset(string $email, string $token, string $datetime)
    {
        $baseTime = strtotime(decrypt($datetime));
        return strtotime('+30 minutes', $baseTime) <= strtotime('now')
            ? "Link expired"
            : view('reset', ['email' => decrypt($email), 'token' => decrypt($token)]);
    }

    public function update(Request $request)
    {
        $this->validatePassword($request);
        $user = User::where('email', $request->input('email'))->first();
        $user->password = Hash::make($request->input('password'));
        $user->save();
        return redirect('/')->with('status', 'Password updated!');
    }

    private function validatePassword(Request $request)
    {
        $this->validate($request, [
            'password' => 'required | min:8 | confirmed',
            'password_confirmation' => 'required | min:8'
        ]);
    }
}
