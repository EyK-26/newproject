<?php

use App\Http\Controllers\api\AuthentificationController;
use App\Http\Controllers\EnquiryController;
use App\Http\Controllers\WishController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/forgot-password', [AuthentificationController::class, 'send']);
Route::get('/get-wishlist', [WishController::class, 'is_added']);
Route::post('/toggle-wishlist', [WishController::class, 'store']);
Route::post('/enquiry', [EnquiryController::class, 'store']);
