<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class Authenticate extends Middleware
{

    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        if (!$request->expectsJson()) {

            if (in_array('auth:admin', $request->route()->middleware())) {
                return route('admin.login');
            }

            return route('login');
        }
        return $request->expectsJson() ? null : route('login');
    }
}
