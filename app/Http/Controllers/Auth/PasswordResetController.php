<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    private function hash_check(User $user, string $psw, string $psw_conf): bool
    {
        return $psw === $psw_conf && Hash::check($psw, $user->password) ? true : false;
    }

    public function update(Request $request): RedirectResponse
    {
        $this->validatePassword($request);
        $user = User::where('email', $request->input('email'))->first();
        if (
            $this->hash_check($user, $request->input('password'), $request->input('password_confirmation'))
        ) {
            return redirect()->back()->with('message_error', 'The new password is the same as the current password.');
        }
        $user->password = Hash::make($request->input('password'));
        $user->save();
        return redirect('/login')->with('message_success', 'Password updated!');
    }

    public function manual_update(Request $request): array
    {
        try {
            $this->validatePassword($request);
            $user = User::findOrFail($request->input('id'));
            if (Auth::user()->id === $user->id) {
                if (
                    $this->hash_check($user, $request->input('password'), $request->input('password_confirmation'))
                ) {
                    return ['message' => 'Please insert a different password than your current password.'];
                }
                $user->password = Hash::make($request->input('password'));
                $user->save();
                return ['message' => 'Your password has been updated.'];
            } else {
                return ['message' => 'Not authorized'];
            }
        } catch (ModelNotFoundException $e) {
            return ['message' => 'User not found'];
        }
    }

    private function validatePassword(Request $request): void
    {
        $this->validate($request, [
            'password' => 'required | min:8 | confirmed',
            'password_confirmation' => 'required | min:8'
        ]);
    }
}
