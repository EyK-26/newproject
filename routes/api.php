<?php

use App\Http\Controllers\api\AuthentificationController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\EnquiryController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WishController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user()->load(['enquiries.answers', 'wishes']);
});

Route::post('/forgot-password', [AuthentificationController::class, 'send']);
Route::put('/password-reset/action', [PasswordResetController::class, 'update'])
    ->name('password.update');
Route::put('/manual-reset/action', [PasswordResetController::class, 'manual_update']);

Route::delete('/user-delete',  [UserController::class, 'destroy']);
Route::put('/change-username', [UserController::class, 'update']);

Route::get('/get-wishlist', [WishController::class, 'is_added']);
Route::post('/toggle-wishlist', [WishController::class, 'store']);
Route::get('/set-wishlist', [WishController::class, 'index']);

Route::get('/enquiry', [EnquiryController::class, 'index']);
Route::post('/enquiry', [EnquiryController::class, 'store']);

Route::get('/custom-offers', [OfferController::class, 'custom_offers']);
