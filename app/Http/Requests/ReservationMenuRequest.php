<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ReservationMenuRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'categoryId' => 'required|integer',
            'limit' => 'required|integer',
            'quota' => 'required|integer',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }
}
