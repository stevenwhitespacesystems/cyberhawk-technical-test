<?php

declare(strict_types=1);

namespace App\Http\Controllers\Inspection;

use App\Http\Controllers\Controller;
use App\Http\Requests\Inspection\ViewRequest;
use App\Http\Responses\ApiResponses;
use Illuminate\Http\JsonResponse;

class ViewController extends Controller
{
    public function __invoke(ViewRequest $request): JsonResponse
    {
        // $payload = $request->validated();

        return ApiResponses::success(['inspection' => 'hello']);
    }
}
