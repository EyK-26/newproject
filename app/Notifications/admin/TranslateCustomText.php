<?php

namespace App\Notifications\admin;

class TranslateCustomText
{
    private $authKey =
    "393c4bea-d902-58be-5818-ad4f90aa90e4:fx";
    public $sentence;
    public $targetLang;
    public $translator;

    public function __construct(string $sentence, string $targetLang)
    {
        $this->sentence = $sentence;
        $this->targetLang = $targetLang;
        $this->translator = new \DeepL\Translator($this->authKey);
    }

    public function translate(): string
    {
        return $this->translator->translateText($this->sentence, null, $this->targetLang); //when null it's auto detected.
    }
}
