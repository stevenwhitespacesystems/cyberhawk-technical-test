<?php

namespace App\Http\Requests\Inspection;

use Illuminate\Foundation\Http\FormRequest;

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
}
