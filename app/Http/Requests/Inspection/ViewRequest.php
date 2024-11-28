<?php

namespace App\Http\Requests\Inspection;

use App\Http\Responses\ApiResponses;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ViewRequest extends FormRequest
{
    public const ID = 'id';
    
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
            self::ID => ['required', 'ulid', 'exists:inspections,id'],
        ];
    }

    public function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(ApiResponses::validationError($validator));
    }
}
