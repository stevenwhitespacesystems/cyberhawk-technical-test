<?php

declare(strict_types=1);
namespace App\Http\Controllers\Auth;

use App\Contracts\Services\AuthServiceContract;
use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponses;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class LogoutController extends Controller
{
    public function __invoke(AuthServiceContract $authService): JsonResponse
    {
        $authService->logout();

        return ApiResponses::success([], Response::HTTP_NO_CONTENT);
    }
}
