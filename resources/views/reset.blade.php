@extends('layouts.layout')
@section('content')
<h1>Reset Password</h1>
@guest
@isset($email)
<form action="{{ route('password.update') }}" method="post">
    @method('put')
    @csrf
    <input type="hidden" name="email" value="{{ $email }}">
    <div class="pwd">
        <div>
            <label for="password">New password</label>
            <input type="password" name="password" id="password">
        </div>
        <div class="toggle">
            <label for="toggle_password">Show Password</label>
            <input type="checkbox" name="toggle_password" id="toggle_password">
        </div>
    </div>
    <div class="pwd_conf">
        <div>
            <label for="password_confirmation">Confirm new password</label>
            <input type="password" name="password_confirmation" id="password_confirmation">
        </div>
        <div class="toggle">
            <label for="toggle_password_confirmation">Show Password</label>
            <input type="checkbox" name="toggle_password_confirmation" id="toggle_password_confirmation">
        </div>
    </div>
    <button type="submit">Reset</button>
</form>
@include('layouts.messages')
@endisset
@else
<h1>404, not authorized</h1>
@endguest

@endsection