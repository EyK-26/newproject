<?php

use App\Http\Controllers\Auth\PasswordResetController;
use Illuminate\Support\Facades\Route;

Route::get('/password-reset/{email}/{token}', [PasswordResetController::class, 'reset'])
    ->name('password.reset');

Route::put('/password-reset/action', [PasswordResetController::class, 'update'])
    ->name('password.update');

Route::view('/{path?}', 'home')
    ->where('path', '.*');
