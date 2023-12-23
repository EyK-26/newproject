<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'title',
        'locality',
        'description',
        'floor_area',
        'land_area',
        'price',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
