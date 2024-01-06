@extends('layouts.layout')

@section('content')
@if($user->can('admin') && auth()->check())
<div class="create_offer__container">
    @if (!empty($offer))
    <h2>Edit Post</h2>
    <form action="{{ route('offers.update', ['offer' => $offer->id]) }}" method="post" enctype="multipart/form-data">
        @else
        <h2>Create New Post</h2>
        <form action="{{ route('offer.store') }}" method="post" enctype="multipart/form-data">
            @endif
            @csrf
            <input type="hidden" name="user_id" value="{{ $user->id }}">
            <div>
                <label for="title">Title</label>
                @if (!empty($offer))
                <input type="text" name="title" id="title" value="{{ old('title', $offer->title) }}" required>
                @else
                <input type="text" name="title" id="title" required>
                @endif
            </div>
            <div>
                <label for="locality">Locality</label>
                @if (!empty($offer))
                <input type="text" name="locality" id="locality" value="{{ old('locality', $offer->locality) }}"
                    required>
                @else
                <input type="text" name="locality" id="locality" @endif </div>
                <div>
                    <label for="description">Description</label>
                    @if (!empty($offer))
                    <textarea name="description" id="description" resize="none"
                        required>{{ old('description', $offer->description) }}</textarea>
                    @else
                    <textarea name="description" id="description" resize="none" required></textarea>
                    @endif
                </div>
                <div>
                    <label for="photos">Photos</label>
                    <input type="file" name="photos[]" id="photos" multiple accept="image/*">
                </div>
                <div>
                    <label for="floor_area">Floor area (m<sup>2</sup>)</label>
                    @if (!empty($offer))
                    <input type="number" name="floor_area" id="floor_area"
                        value="{{ old('floor_area', $offer->floor_area) }}" required>
                    @else
                    <input type="number" name="floor_area" id="floor_area" required>
                    @endif
                </div>
                <div>
                    <label for="land_area">Land area (m<sup>2</sup>)</label>
                    @if (!empty($offer))
                    <input type="number" name="land_area" id="land_area"
                        value="{{ old('land_area', $offer->land_area) }}" required>
                    @else
                    <input type="number" name="land_area" id="land_area" required>
                    @endif
                </div>
                <div>
                    <label for="price">Price (CZK)</label>
                    @if (!empty($offer))
                    <input type="number" name="price" id="price" value="{{ old('price', $offer->price) }}" required>
                    @else
                    <input type="number" name="price" id="price" required>
                    @endif
                </div>
                <div>
                    @if (!empty($offer))
                    <button type="submit">Edit</button>
                    @else
                    <button type="submit">Submit</button>
                    @endif
                </div>
        </form>

        @include('layouts.messages')
</div>
@else
<h1>404. Not Authorized.</h1>
@endif
@endsection