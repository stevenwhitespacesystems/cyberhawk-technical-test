<?php

declare(strict_types=1);

namespace App\Http\Responses;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

final class ApiResponses
{
    public static function validationError(Validator $validator): JsonResponse
    {
        return new JsonResponse([
            'message' => 'Validation errors',
            'data' => $validator->errors()->all(),
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public static function error(string $message, int $status = Response::HTTP_BAD_REQUEST): JsonResponse
    {
        return new JsonResponse([
            'message' => $message,
        ], $status);
    }

    /**
     * @param array<string, mixed> $data
     */
    public static function success(array $data = [], int $status = Response::HTTP_OK): JsonResponse
    {
        return new JsonResponse([
            'success' => true,
            'data' => $data,
        ], $status);
    }
}
