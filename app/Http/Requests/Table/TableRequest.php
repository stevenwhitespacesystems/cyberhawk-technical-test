<?php

declare(strict_types=1);

namespace App\Http\Requests\Table;

use App\Http\Responses\ApiResponses;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

final class TableRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'columns' => ['required', 'array'],
        ];
    }

    public function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(ApiResponses::validationError($validator));
    }
}
