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
            'host_id' => 'required|string',
            'game_title' => 'required|string',
            'game_image' => 'required|string',
            'console' => 'required|string',
            'description' => 'string',
            'start_date_time' => 'required|date',
            'end_date_time' => 'required|date',
            'place_name' => 'required|string',
            'street_address' => 'required|string',
            'latitude' => 'required|numeric|between:-90,90|decimal:5,20',
            'longitude' => 'required|numeric|between:-180,180|decimal:5,20',
            'players_wanted' => 'integer|gte:1',
            'controllers_wanted' => 'integer',
            'controllers_brought' => 'required|integer',
        ];
    }
}
