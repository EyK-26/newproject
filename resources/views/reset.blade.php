@extends('layouts.layout')
@section('content')
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
    <button type="submit">Reset</button>
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
@endsection