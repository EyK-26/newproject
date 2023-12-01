<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="">
    @vite('resources/css/reset.scss')
    @isset($token)
    <meta name="csrf-token" content="{{ $token }}">
    @endisset
    <title>MyApp</title>
</head>

<body>
    <h1>Reset Password</h1>
    @isset($email)
    @guest
    <form action="{{ route('password.update') }}" method="post">
        @method('put')
        @csrf
        <input type="hidden" name="email" value="{{ $email }}">
        <label for="password">New password</label>
        <input type="password" name="password" id="password">
        <label for="password_confirmation">Confirm new password</label>
        <input type="password" name="password_confirmation" id="password_confirmation">
        <input type="submit" value="Reset Password">
    </form>
    @else
    <h1>404 Not Authorized</h1>
    @endguest
    @endisset

    <ul class="errors">
        @if(session('message'))
        <li>{{ session('message') }}</li>
        @endif
        @if (count($errors) > 0)
        @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
        @endforeach
        @endif
    </ul>

</body>

</html>