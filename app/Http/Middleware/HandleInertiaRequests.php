<?php

namespace App\Http\Middleware;

use App\Models\NavigationLink;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    protected function createAcronym($string): ?string
    {
        $output = null;
        $token  = strtok($string, ' ');
        while ($token !== false) {
            $output .= $token[0];
            $token = strtok(' ');
        }

        return $output;
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth'   => [
                'user' => $request->user() ? [
                    'acronym'     => $this->createAcronym($request->user()->name),
                    'id'          => $request->user()->id_employee,
                    'username'    => $request->user()->username,
                    'name'        => $request->user()->firstname . ' ' . $request->user()->lastname,
                    'email'       => $request->user()->email,
                    'id_role'     => $request->user()->id_role,
                    'role_action' => Role::find($request->user()->id_role),
                    'nav_link'    => $request->user()->navigationLink,
                    'nav_links'   => $request->user()->getNavigationList($request->user()),
                ] : null,
            ],
            'flash'  => [
                'type'    => $request->session()->get('type'),
                'message' => $request->session()->get('message'),
            ],
            'params' => $request->session()->get('params'),
            'ziggy'  => fn()  => [
                ...(new Ziggy)->toArray(), ...[
                    'location' => $request->url(),
                ],
            ],
            'shop'   => $request->cookie('id_shop'),
            'settings' => [
                'api_domain' => env('API_DOMAIN'),
                'app_url' => env('APP_URL'),
            ]
        ]);
    }
}
