<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizAnswer extends Model
{
    use HasFactory;
    public $table = 'quizanswers';

    protected $fillable = [
        'text'
    ];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
