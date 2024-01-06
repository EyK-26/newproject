<?php

namespace App\Notifications\admin;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;

class TranslateCustomText
{
    public static function translate(string $source): string
    {
        if (!empty(Auth::user())) {
            $target_language = Auth::user()->language;
            if (isset($target_language)) {
                $authKey =
                    "393c4bea-d902-58be-5818-ad4f90aa90e4:fx";
                $translator = new \DeepL\Translator($authKey);
                return $translator->translateText($source, null, $target_language); //when null it's auto detected.
            } else {
                return $source;
            }
        } else {
            return $source;
        }
    }
}
