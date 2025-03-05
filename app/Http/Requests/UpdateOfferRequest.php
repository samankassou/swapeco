<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOfferRequest extends FormRequest
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
            'type' => 'required',
            'title' => 'required',
            'description' => 'required',
            'estimated_value' => 'required|numeric',
            'campuses' => [
                'required',
                'array',
                'min:1',
                'distinct',
            ],
            'campuses.*' => 'required|exists:campuses,id',
            'images' => 'array',
            'images.*' => 'file|max:2048',
            'delete_images' => 'array',
        ];
    }
}
