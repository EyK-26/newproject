@extends('layouts.layout')

@section('content')
@if($user->can('admin') && auth()->check())

<div class="create_offer__container">
    <h2>Create New Post</h2>
    <form action="{{ route('offer.store') }}" method="post" enctype="multipart/form-data">
        @csrf
        <input type="hidden" name="user_id" value="{{ $user->id }}">
        <div>
            <label for="title">Title:</label>
            <input type="text" name="title" id="title" required>
        </div>

        <div>
            <label for="locality">Locality:</label>
            <input type="text" name="locality" id="locality" required>
        </div>

        <div>
            <label for="description">Description:</label>
            <textarea name="description" id="description" resize="none" required></textarea>
        </div>

        <div>
            <label for="photos">Photos:</label>
            <input type="file" name="photos[]" id="photos" multiple accept="image/*">
        </div>

        <div>
            <button type="submit">Submit</button>
        </div>
    </form>
    <ul class="success">
        @if(session('message'))
        <li class="li_message">{{ session('message') }}</li>
        @endif
    </ul>
    <ul class="errors">
        @if (count($errors) > 0)
        @foreach ($errors->all() as $error)
        <li class="li_message">{{ $error }}</li>
        @endforeach
        @endif
    </ul>
</div>

@else
<h1>404. Not Authorized.</h1>
@endif
@endsection