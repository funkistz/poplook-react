<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\NavigationLink;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Schema;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {

        $this->registerPolicies();
        $is_exist = Schema::hasTable('navigation_link'); //check if navigation_link table is exist.
        $navigation_link = false;
        if (!empty($is_exist)) {
            $navigation_link = NavigationLink::where('active',1)->get();
        }
        if (!empty($navigation_link)) {
            foreach ($navigation_link as $link) {
                $gate = str_replace(' ', '_',strtolower($link->label));
                Gate::define($gate, function ($user) use($link) {
                    $link_role = $link->role;
                    $link_role_arr = [];
                    foreach ($link_role as $key => $value) {
                        array_push($link_role_arr, $value->id);
                    }
                    return in_array($user->id_role, $link_role_arr);
                    // return false;
                });
            }
        }

        // Gate::define('do-one-thing', function ($user) {
        //     return $user->role('do-one-thing');
        // });
    }
}
