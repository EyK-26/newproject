<?php

use App\Http\Controllers\api\AuthentificationController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\EnquiryController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WishController;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user()->load(['enquiries.answers', 'wishes.offer']);
});

Route::get('/question', [QuestionController::class, 'show']);

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
Route::get('/custom-product', [OfferController::class, 'show']);

Route::get('/question-show', [QuestionController::class, 'show']);

Route::get('/get-languages', function (): array {
    $authKey = "393c4bea-d902-58be-5818-ad4f90aa90e4:fx";
    $translator = new \DeepL\Translator($authKey);
    $targetLanguages = $translator->getTargetLanguages();
    if (count($targetLanguages) > 0) {
        return $targetLanguages;
    } else {
        return [];
    }
    // foreach ($targetLanguages as $targetLanguage) {
    //     if ($targetLanguage->supportsFormality) {
    //         echo $targetLanguage->name . ' (' . $targetLanguage->code . ') supports formality';
    //     }
    // }
});

Route::post('/set-language', function (Request $request): array {
    try {
        $user = User::findOrFail($request->input('user_id'));
        $user->language = $request->input('user_language');
        $user->save();
        return ['message' => 'language has been updated'];
    } catch (ModelNotFoundException $e) {
        return ['message' => 'error occured'];
    }
});
