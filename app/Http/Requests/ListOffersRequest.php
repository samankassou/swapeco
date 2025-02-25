<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ListOffersRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'filter.title' => ['sometimes', 'nullable', 'string'],
            'filter.type' => ['sometimes', 'nullable', 'string', 'in:all,product,service'],
            'filter.status' => ['sometimes', 'nullable', 'string', 'in:all,published,draft'],
            'sort' => ['sometimes', 'nullable', 'string', 'in:created_at,-created_at,title,-title'],
        ];
    }

    public function messages(): array
    {
        return [
            'filter.type.in' => "Le type d'offre sélectionné n'est pas valide.",
            'filter.status.in' => "Le statut sélectionné n'est pas valide.",
            'sort.in' => "Le tri sélectionné n'est pas valide.",
        ];
    }
}
