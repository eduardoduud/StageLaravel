<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWorkflowRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:55',
            'department_id' => 'string',
            'sub_id' => '',
            'description' => 'required|string',
            'htmltext' => ''
        ];
    }
}
