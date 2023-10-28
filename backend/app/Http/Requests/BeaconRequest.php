<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BeaconRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'host_id' => 'required',
            'title' => 'required|string',
            'game_title' => 'required|string',
            'game_system' => 'required|string',
            'description' => 'string',
            'start_date_time' => 'required|date',
            'end_date_time' => 'required|date',
            'address' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'players_needed' => 'integer'
        ];
    }
}
