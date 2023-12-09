<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'client_id',
        'enquiry_id',
        'product_id'
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
