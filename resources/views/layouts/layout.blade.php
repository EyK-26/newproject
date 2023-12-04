<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="">
    @vite('resources/css/admin.scss')
    @isset($token)
    <meta name="csrf-token" content="{{ $token }}">
    @else
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @endisset
    @can('has_role', 'admin')
    <title>Real Estate Comparator - Admin</title>
    @else
    <title>Real Estate Comparator</title>
    @endcan
</head>

<body>
    @include('layouts.navbar')
    <section>
        @yield('content')
    </section>
    @include('layouts.footer')
</body>

</html>