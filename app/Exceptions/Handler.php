<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {
        if ($request->expectsJson()) {
            // Handle API responses or AJAX requests
            return parent::render($request, $exception);
        }

        if ($request->is('api/*')) {
            return parent::render($request, $exception);
        }

        if ($exception instanceof \Symfony\Component\HttpKernel\Exception\HttpException) {
           
            $statusCode = $exception->getStatusCode();

            return Inertia::render('Error/ErrorPage', [
                'code' => $statusCode,
            ])->toResponse($request)->setStatusCode($statusCode);
        }

        return parent::render($request, $exception);

    }
}
