<?php

use App\Http\Controllers\Auth\PasswordResetController;
use Illuminate\Support\Facades\Route;

Route::get('/password-reset/{token}/{email}', [PasswordResetController::class, 'reset'])
    ->whereAlphaNumeric('token')
    ->where('token')->name('password.reset');

Route::post('/password-reset/action', [PasswordResetController::class, 'update'])
    ->name('password.update');

Route::view('/{path?}', 'home')
    ->where('path', '.*');
