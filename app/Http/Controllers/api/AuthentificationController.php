<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\ResetPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class AuthentificationController extends Controller
{
    public function send(Request $request): array
    {
        $user = User::where('email', $request->input('email'))->first() ?? null;
        if ($user) {
            Notification::send($user, new ResetPassword($user));
            return ['message' => 'Email sent'];
        } else {
            return ['message' => 'Email Not Found'];
        }
    }

    public function reset(Request $request): array
    {
        $user = User::where('email', $request->input('email'))->first() ?? null;
        if ($user) {
            Notification::send($user, new ResetPassword($user));
            return ['message' => 'Email sent'];
        } else {
            return ['message' => 'Email Not Found'];
        }
    }
}
