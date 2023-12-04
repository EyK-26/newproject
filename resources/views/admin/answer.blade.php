@extends('layouts.layout')

@section('content')
@auth

@if($user->can('admin') && isset($enquiry))
<h1>Answer User</h1>
<form action="{{ route('answers.store') }}" method="post">
    @csrf
    <input type="hidden" name="enquiry" value={{ $enquiry }}>
    <textarea name="text" id="text" cols="80" rows="20" placeholder="enter your answer here"></textarea>
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
            <td><a href={{ "/prod_view/$enquiry->product_id" }} target="_blank">View property</a></td>
        </tr>
    </tbody>
</table>

<ul class="success">
    @if(session('message'))
    <li>{{ session('message') }}</li>
    @endif
</ul>
<ul class="errors">
    @if (count($errors) > 0)
    @foreach ($errors->all() as $error)
    <li>{{ $error }}</li>
    @endforeach
    @endif
</ul>

@else
<p>404 not authorized</p>
@endif

@else
<p>Please login as admin to see the page.</p>
@endauth

@endsection