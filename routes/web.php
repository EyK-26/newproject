<?php

use App\Http\Controllers\AnswerController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\EnquiryController;
use Illuminate\Support\Facades\Route;

Route::get('/password-reset/{email}/{token}/{datetime}', [PasswordResetController::class, 'reset'])
    ->name('password.reset');

Route::put('/password-reset/action', [PasswordResetController::class, 'update'])
    ->name('password.update');

Route::group(['middleware' => 'can:admin'], function () {
    Route::get('/enquiry/{product_id}/{user_id}', [EnquiryController::class, 'show'])
        ->whereNumber(['product_id', 'user_id'])
        ->name('enquiry.show');

    Route::get('/enquiry/answer/{enquiry_id}', [EnquiryController::class, 'answer'])
        ->whereNumber('enquiry_id')
        ->name('enquiry.answer');

    Route::post('/answers', [AnswerController::class, 'store'])
        ->name('answers.store');
});

Route::view('/{path?}', 'home')
    ->where('path', '.*');
