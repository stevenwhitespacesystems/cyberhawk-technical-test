<?php

declare(strict_types=1);

namespace App\Http\Requests\InspectedComponent;

use App\Http\Responses\ApiResponses;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateGradeRequest extends FormRequest
{
    public const ID = 'id';
    public const GRADE = 'grade';

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
            self::ID => ['required', 'string', 'exists:inspected_components,id'],
            self::GRADE => ['required', 'integer', 'min:1', 'max:5'],
        ];
    }

    public function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(ApiResponses::validationError($validator));
    }
}
