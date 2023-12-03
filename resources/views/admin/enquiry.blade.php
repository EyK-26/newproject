<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="">
    @vite('resources/css/reset.scss')
    {{-- @isset($token)
    <meta name="csrf-token" content="{{ $token }}">
    @endisset --}}
    <title>MyApp</title>
</head>

<body>
    @isset($enquiry)
    <h1>See Enquiry</h1>
    @auth
    <p>{{ $enquiry->message }}</p>
    @else
    <p>404 not authorized</p>
    @endauth
    @endisset
</body>

</html>