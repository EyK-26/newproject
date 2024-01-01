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
    @can('admin')
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

<script>
    const toggle_1 = document.getElementById('toggle_password');
    const toggle_2 = document.getElementById('toggle_password_confirmation');
    if (toggle_1) {
        toggle_1.addEventListener('click', () => {
            const psw = document.getElementById('password');
            psw.type = psw.type === 'password' ? 'text' : 'password';
        })
    }
    if (toggle_2) {     
        toggle_2.addEventListener('click', () => {
            const psw_conf = document.getElementById('password_confirmation');
            psw_conf.type = psw_conf.type === 'password' ? 'text' : 'password';
        })  
    }
</script>

</html>