<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class AuthentificationController extends Controller
{
    public function send(Request $request): array
    {
        $user = User::where('email', $request->input('email'))->first() ?? null;
        if ($user) {
            Notification::send($user, new PasswordReset($user));
            return ['message' => 'Email sent'];
        } else {
            return ['message' => 'Email Not Found'];
        }
    }
}
