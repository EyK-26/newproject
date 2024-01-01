@extends('layouts.layout')

@section('content')
@auth

@if($user->can('admin') && isset($enquiry))
<h1>Answer User</h1>
<form action="{{ route('answers.store') }}" method="post">
    @csrf
    <input type="hidden" name="enquiry_id" value={{ $enquiry->id }}>
    <textarea name="message" id="text" placeholder="enter your answer here"></textarea>
    <button type="submit">Send</button>
</form>

<h2>User Details</h2>
<table>
    <thead>
        <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Property</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{{ $enquiry->user->id }}</td>
            <td>{{ $enquiry->user->name }}</td>
            <td>{{ $enquiry->user->email }}</td>
            <td><a href={{ "/custom_prod_view/$enquiry->offer_id" }} target="_blank">View property</a></td>
        </tr>
    </tbody>
</table>

@include('layouts.messages')

@else
<p>404 not authorized</p>
@endif

@else
<p>Please login as admin to see the page.</p>
@endauth

@endsection