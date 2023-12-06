<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;

class PasswordResetController extends Controller
{
    public function reset(string $email, string $token, string $datetime): string|View
    {
        $baseTime = strtotime(decrypt($datetime));
        return strtotime('+30 minutes', $baseTime) <= strtotime('now')
            ? "Link expired"
            : view('reset', compact('email', 'token'));
    }

    public function update(Request $request): RedirectResponse
    {
        $user = User::where('email', $request->input('email'))->first();
        if (
            Hash::check($request->input('password'), $user->password)
            && Hash::check($request->input('password_confirmation'), $user->password)
        ) {
            return redirect()->back()->with('message', 'The new password is the same as the current password.');
        }
        $this->validatePassword($request);
        $user->password = Hash::make($request->input('password'));
        $user->save();
        return redirect('/login')->with('message', 'Password updated!');
    }

    public function manual_update(Request $request): array
    {
        $user = User::findOrFail($request->input('id'));
        if (
            Hash::check($request->input('password'), $user->password)
            && Hash::check($request->input('password_confirmation'), $user->password)
        ) {
            return ['message' => 'Please insert a different password than your current password.'];
        }
        $this->validatePassword($request);
        $user->password = Hash::make($request->input('password'));
        $user->save();
        return ['message' => 'Your password has been updated.'];
    }

    private function validatePassword(Request $request): void
    {
        $this->validate($request, [
            'password' => 'required | min:8 | confirmed',
            'password_confirmation' => 'required | min:8'
        ]);
    }
}
