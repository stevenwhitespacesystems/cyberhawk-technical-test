<?php

declare(strict_types=1);

namespace App\Http\Requests\InspectedComponent;

use Illuminate\Foundation\Http\FormRequest;

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
            self::GRADE => ['required', 'numeric', 'min:1', 'max:5'],
        ];
    }
}
