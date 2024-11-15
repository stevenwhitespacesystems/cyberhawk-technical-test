<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Contracts\Services\AuthServiceContract;
use App\DTO\RegisterRequestDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Responses\ApiResponses;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

final class RegisterController extends Controller
{
    public function __invoke(
        RegisterRequest $request,
        AuthServiceContract $authService
    ): JsonResponse {
        /** @var array{name: string, email: string, password: string} $fields */
        $fields = $request->validated();
        $dto = new RegisterRequestDTO(
            name: $fields['name'],
            email: $fields['email'],
            password: $fields['password'],
        );

        $responseDto = $authService->register($dto);

        return ApiResponses::success([
            'user' => $responseDto->user,
            'token' => $responseDto->token,
        ], Response::HTTP_CREATED);
    }
}
