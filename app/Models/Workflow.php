<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Workflow extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = ['name', 'setor_id', 'description', 'htmltext', 'parent_id'];

    public function parent()
    {
        return $this->belongsTo(Department::class);
    }
}
