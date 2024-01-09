<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite('resources/css/app.scss')
    @can('admin')
    <title>Quiz and Properties - Admin</title>
    @else
    <title>Quiz and Properties</title>
    @endcan
</head>

<body>
    @if(session('message_success'))
    <div class="reset_success">{{ session('message_success') }}</div>
    @endif
    <div id="root"></div>
    @vite('resources/js/main.tsx')
</body>

</html>