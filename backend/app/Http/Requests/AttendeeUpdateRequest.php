<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AttendeeUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'beacon_id' => 'required|string',
            'user_id' => 'required|string',
            'controllers_brought' => 'required|integer'
        ];
    }
}
