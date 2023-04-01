<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\ApiResponseService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class UserController extends Controller
{
    /**
     * @param User $user
     * @param ApiResponseService $apiResponseService
     * @return JsonResponse
     */
    public function getUser(ApiResponseService $apiResponseService): JsonResponse
    {
        return $apiResponseService->response(
            ResponseAlias::HTTP_OK,
            '',
            'success',
            new UserResource(Auth::user())
        );
    }
}
