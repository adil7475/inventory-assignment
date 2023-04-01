<?php

namespace App\Services;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ApiResponseService
{
    /**
     * @param int $statusCode
     * @param string $message
     * @param string $statusType
     * @param $data
     * @return JsonResponse
     */
    public function response(int $statusCode, string $message, string $statusType = 'fail', $data = null): JsonResponse
    {
        $response['data'] = $data;
        $response['code'] = $statusCode;
        $response['message'] = $message;
        $response['status'] = $statusType;
        return new JsonResponse($response, $statusCode);
    }

    /**
     * @return JsonResponse
     */
    public function responseWithAccessDenied(string $message): JsonResponse
    {
        return $this->response(ResponseAlias::HTTP_FORBIDDEN, trans($message));
    }
}
