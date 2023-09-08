<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Workflow extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = ['name', 'setor', 'description', 'htmltext', 'parent_id'];

    public function parent()
    {
        return $this->belongsTo(Workflow::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Workflow::class, 'parent_id');
    }
}
