<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Contracts\Services\AuthServiceContract;
use App\DTO\LoginRequestDTO;
use App\Exceptions\BadUserCredentialsException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Responses\ApiResponses;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class LoginController extends Controller
{
    public function __invoke(
        LoginRequest $request,
        AuthServiceContract $authService
    ): JsonResponse {
        /** @var array{email: string, password: string} $fields */
        $fields = $request->validated();
        $dto = new LoginRequestDTO(
            email: $fields['email'],
            password: $fields['password'],
        );

        try {
            $responseDto = $authService->login($dto);
            return ApiResponses::success([
                'user' => $responseDto->user,
                'token' => $responseDto->token,
            ]);
        } catch (ModelNotFoundException $e) {
            // Didn't find user by email
            return ApiResponses::error('Incorrect email/password', Response::HTTP_NOT_FOUND);
        } catch (BadUserCredentialsException $e) {
            // Password is incorrect
            return ApiResponses::error('Incorrect email/password', Response::HTTP_NOT_FOUND);
        }
    }
}
