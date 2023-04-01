<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\StoreRequest;
use App\Http\Requests\Product\UpdateRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ApiResponseService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ProductController extends Controller
{
    /**
     * @param ApiResponseService $apiResponseService
     * @return JsonResponse
     */
    public function index(ApiResponseService $apiResponseService): JsonResponse
    {
        $products = Product::all();

        return $apiResponseService->response(
            ResponseAlias::HTTP_OK,
            '',
            'success',
            ProductResource::collection($products)
        );
    }

    /**
     * @param StoreRequest $request
     * @param ApiResponseService $apiResponseService
     * @return JsonResponse
     */
    public function store(StoreRequest $request, ApiResponseService $apiResponseService): JsonResponse
    {
        if (! Gate::allows('create-product')) {
            return $apiResponseService->responseWithAccessDenied('You are not allowed to create product');
        }
        $data = $request->validated();

        $product = Product::UpdateOrCreate(
            ['slug' => str()->slug($data['name'])],
            [
                'name' => $data['name'],
                'slug' => str()->slug($data['name']),
                'description' => $data['description']
            ]
        );

        return $apiResponseService->response(
            Response::HTTP_CREATED,
            trans('Product has been created successfully'),
            'success',
            new ProductResource($product)
        );
    }

    /**
     * @param Product $product
     * @param ApiResponseService $apiResponseService
     * @return JsonResponse
     */
    public function view(Product $product, ApiResponseService $apiResponseService): JsonResponse
    {
        if (! Gate::allows('view-product')) {
            return $apiResponseService->responseWithAccessDenied('You are not allowed to view product');
        }

        return $apiResponseService->response(
            ResponseAlias::HTTP_OK,
            '',
            'success',
            new ProductResource($product)
        );
    }

    /**
     * @param Product $product
     * @param UpdateRequest $request
     * @param ApiResponseService $apiResponseService
     * @return JsonResponse
     */
    public function update(Product $product, UpdateRequest $request, ApiResponseService $apiResponseService): JsonResponse
    {
        if (! Gate::allows('update-product')) {
            return $apiResponseService->responseWithAccessDenied('You are not allowed to update product');
        }

        $data = $request->validated();

        $product->update([
            'name' => $data['name'],
            'description' => $data['description']
        ]);

        return $apiResponseService->response(
            ResponseAlias::HTTP_OK,
            trans('Product has been update successfully'),
            'success',
            new ProductResource($product)
        );
    }

    /**
     * @param Product $product
     * @param ApiResponseService $apiResponseService
     * @return JsonResponse
     */
    public function destroy(Product $product, ApiResponseService $apiResponseService): JsonResponse
    {
        if (! Gate::allows('delete-product')) {
            return $apiResponseService->responseWithAccessDenied('You are not allowed to update product');
        }

        $product->delete();

        return $apiResponseService->response(
            ResponseAlias::HTTP_OK,
            trans('Product has been delete successfully'),
            'success'
        );
    }
}
