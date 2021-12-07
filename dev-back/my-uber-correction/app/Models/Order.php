<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['status', 'client_id', 'shipper_id'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function shipper()
    {
        return $this->belongsTo(Shipper::class);
    }
}
