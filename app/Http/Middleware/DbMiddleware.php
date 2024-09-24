<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

class DbMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $db_name = $request->db_name;

        if (!empty($db_name)) {
            DB::disconnect('mysql'); //here connection name, I used mysql for example
            Config::set('database.connections.mysql.database', $db_name); //new database name, you want to connect to.
        }

        return $next($request);
    }
}
