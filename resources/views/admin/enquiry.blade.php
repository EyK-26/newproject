<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="">
    @vite('resources/css/reset.scss')
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>MyApp</title>
</head>

<body>
    @auth

    @if($user->can('has_role', 'admin') && isset($enquiry))
    <h1>See Enquiry</h1>
    <p>{{ $enquiry->message }}</p>
    @else
    <p>404 not authorized</p>
    @endif

    @else
    <p>Please login as admin to see the page.</p>
    @endauth
</body>

</html>