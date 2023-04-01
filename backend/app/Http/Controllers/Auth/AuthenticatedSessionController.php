<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use App\Services\ApiResponseService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): View
    {
        return view('auth.login');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function login(LoginRequest $request, ApiResponseService $apiResponseService): JsonResponse
    {
        $data = $request->validated();

        if (! Auth::attempt(['email' => $data['email'], 'password' => $data['password']])) {
            return $apiResponseService->response(
                Response::HTTP_UNAUTHORIZED,
                'Email or password does not match',
            );
        }

        $user = User::where('email', $data['email'])->first();

        return $apiResponseService->response(
            Response::HTTP_OK,
            trans('User login successfully'),
            'success',
            ['access_token' => $user->createToken('api')->plainTextToken]
        );
    }
}
