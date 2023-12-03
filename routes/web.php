<?php

use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\EnquiryController;
use Illuminate\Support\Facades\Route;

Route::get('/password-reset/{email}/{token}/{datetime}', [PasswordResetController::class, 'reset'])
    ->name('password.reset');

Route::put('/password-reset/action', [PasswordResetController::class, 'update'])
    ->name('password.update');

Route::get('/enquiry/{product_id}/{user_id}', [EnquiryController::class, 'show_enquiry'])
    ->whereNumber(['product_id', 'user_id'])
    ->name('enquiry.show');

Route::view('/{path?}', 'home')
    ->where('path', '.*');
