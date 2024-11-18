<?php

declare(strict_types=1);
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponses;
use App\Models\User;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\JsonResponse;
use Laravel\Sanctum\Contracts\HasApiTokens;
use Laravel\Sanctum\PersonalAccessToken;
use Symfony\Component\HttpFoundation\Response;

class LogoutController extends Controller
{
    public function __invoke(Guard $auth): JsonResponse
    {
        /** @var User|HasApiTokens $user */
        $user = $auth->user();
        /** @var PersonalAccessToken $accessToken */
        $accessToken = $user->currentAccessToken();
        $accessToken->delete();

        return ApiResponses::success([], Response::HTTP_NO_CONTENT);
    }
}
