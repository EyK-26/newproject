@extends('layouts.layout')

@section('content')
@include('layouts.messages')
@if($user->can('admin') && auth()->check())
<div class="offers_container">
    <div class="offer">
        @foreach ($offers as $offer)
        <h3>{{ $offer->title }}</h3>
        <p>{{ $offer->description }}</p>
        <p>{{ $offer->floor_area }}</p>
        <p>{{ $offer->land_area }}</p>
        <p>{{ $offer->price }}</p>
        @foreach(explode(', ', $offer->photo_path) as $photo)
        <img src="{{ asset('uploads/' . $photo) }}" alt="{{ $offer->title }}">
        @endforeach

        @endforeach
    </div>
    {{ $offers->links() }}
</div>
@else
<h1>404. Not Authorized.</h1>
@endif

@endsection