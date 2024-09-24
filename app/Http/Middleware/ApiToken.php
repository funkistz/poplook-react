<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $api_key = $request->header('X-API-KEY');
        if ($api_key != env('API_KEY_TOKEN')) {
            return response()->json('Unauthorized', 401);
        }

        return $next($request);
    }
}
