<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'email_verified_at',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function wishes()
    {
        return $this->hasMany(Wish::class);
    }

    public function enquiries()
    {
        return $this->hasMany(Enquiry::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function offers()
    {
        return $this->hasMany(Offer::class);
    }

    public function questions()
    {
        return $this->belongsToMany(Question::class);
    }

    public function quizanswers()
    {
        return $this->belongsToMany(QuizAnswer::class);
    }
}
