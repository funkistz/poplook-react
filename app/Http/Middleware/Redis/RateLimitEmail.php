<?php

namespace App\Http\Middleware\Redis;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Symfony\Component\HttpFoundation\Response;

class RateLimitEmail
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next): Response
    {
        $executed = Redis::throttle('email_sending')
            ->allow(500) // 500 operations per second
            ->every(1)   // 1 second
            ->then(function () use ($next, $request) {
                return $next($request);
            }, function () use ($request) {
                // If this is a job, release it back to the queue
                if (method_exists($request, 'release')) {
                    $request->release(0.1); // Release back to queue with 100ms delay
                    return null;
                }

                // If this is an HTTP request, return a 429 Too Many Requests response
                return response('Too Many Requests', 429);
            });

        if ($executed === false) {
            return response('Too Many Requests', 429);
        }

        return $executed;
    }
}
