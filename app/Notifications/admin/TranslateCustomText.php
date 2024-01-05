<?php

namespace App\Notifications\admin;

use Illuminate\Support\Facades\Auth;

class TranslateCustomText
{
    public static function translate(string $source): string
    {
        $authKey =
            "393c4bea-d902-58be-5818-ad4f90aa90e4:fx";
        $target_language = Auth::user()->language;
        $translator = new \DeepL\Translator($authKey);
        return $translator->translateText($source, null, $target_language); //when null it's auto detected.
    }
}
