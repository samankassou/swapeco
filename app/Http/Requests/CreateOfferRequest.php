<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateOfferRequest extends FormRequest
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
            'estimated_value' => 'required',
            'status' => 'required',
            'campuses' => [
                'required',
                'array',
                'min:1',
                'distinct',
            ],
            'campuses.*' => 'required|exists:campuses,id',
            'files' => 'array',
            'files.*' => 'file|max:2048',
        ];
    }
}
