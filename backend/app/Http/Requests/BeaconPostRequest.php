<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BeaconPostRequest extends FormRequest
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
            'host_id' => 'string',
            'title' => 'required|string',
            'game_title' => 'required|string',
            'game_system' => 'required|string',
            'description' => 'string',
            'start_date_time' => 'required|date',
            'end_date_time' => 'required|date',
            'address' => 'required|string',
            'latitude' => 'required|numeric|between:-90,90|decimal:5,20',
            'longitude' => 'required|numeric|between:-180,180|decimal:5,20',
            'num_players' => 'integer'
        ];
    }
}
