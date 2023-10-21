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
            'game.game_title' => 'required|string',
            'game.game_image' => 'required|string',
            'description' => 'string',
            'date_time' => 'required|date',
            'location.description' => 'required|string',
            'location.latitude' => 'required|numeric',
            'location.longtitude' => 'required|numeric',
            'players_needed' => 'integer'
        ];
    }
}
