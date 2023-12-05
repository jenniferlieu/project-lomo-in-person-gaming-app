<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BeaconUpdateRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        return [
            'host_id' => 'string',
            'title' => 'string',
            'game_title' => 'string',
            'game_image' => 'string',
            'game_system' => 'string',
            'description' => 'string',
            'start_date_time' => 'date',
            'end_date_time' => 'date',
            'address' => 'string',
            'latitude' => 'numeric',
            'longitude' => 'numeric',
            'num_players' => 'integer',
            'controllers_wanted' => 'integer'
        ];
    }
}
