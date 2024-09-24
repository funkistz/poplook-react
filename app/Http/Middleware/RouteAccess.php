<?php

namespace App\Http\Middleware;

use App\Models\NavigationLinkRole;
use App\Models\Role;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class RouteAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $id_role = $request->user()->id_role;
        $role = Role::find($id_role);
        DB::enableQueryLog();
        // $navigation_link_role = NavigationLinkRole::where('id_role', $id_role)->with(['navigationLink', 'navigationLinkChildren'])->get();
        $navigation_link_role = $request->user()->getNavigationList($request->user());
        $query = DB::getRawQueryLog();
        $navigation_link = $navigation_link_role;
        $current_url = explode('/',$request->getRequestUri());
        $method = $request->method();
        foreach ($navigation_link as $key => $value) {
            $val_nav = $value['parent'];
            $val_nav_child = $value['children'];
            $val_nav_str = explode('.',$val_nav['link']);
            if (count($val_nav_child) > 0) {
                foreach ($val_nav_child as $key => $val_nav_child_value) {
                    $exp_val_nav_child_value = explode('.',$val_nav_child_value['link']);
                    if (str_contains($current_url[1], $exp_val_nav_child_value[0])) {
                        // commented to check view access, delete if there's no issue
                        // dd([implode('/',$current_url), $current_url[1]]);
                        // if ($role->action == 2 && str_contains(implode('/',$current_url),$current_url[1].'/')) {
                        //     abort(403, 'Unauthorized');
                        // }
                        // end
                        return $next($request);
                    }
                }
            }else{
                if (str_contains($val_nav_str[0], $current_url[1])) {
                    return $next($request);
                }
            }
        }
        
        abort(403, 'Unauthorized');
    }
}