<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        return ApiResponses::success([
            'user' => $request->user(),
        ], Response::HTTP_OK);
    }
}
