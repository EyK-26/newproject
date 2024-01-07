<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;
    protected $fillable = [
        'text'
    ];

    public function quizanswers()
    {
        return $this->hasMany(QuizAnswer::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
