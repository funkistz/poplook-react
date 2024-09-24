<!DOCTYPE html>
<html class='scroll-smooth' lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Poplook</title>
    <link rel="shortcut icon" href="/PL_ICON.png" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans text-[.915rem] tracking-tight antialiased text-tiny">
    @inertia
</body>

</html>