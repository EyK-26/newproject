@extends('layouts.layout')

@section('content')
@auth

@if($user->can('admin') && isset($enquiry))
<h1>See Enquiry Details</h1>
<textarea cols="40" rows="20" resize="none" disabled id="enquiry">{{ $enquiry->message }}</textarea>

@isset($client)
@isset($product_id)
<h2>From</h2>
<table>
    <thead>
        <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Product ID</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{{ $client->id }}</td>
            <td>{{ $client->name }}</td>
            <td>{{ $client->email }}</td>
            <td><a href={{ "/prod_view/$product_id" }} target="_blank">{{ $product_id }}</a></td>
        </tr>
    </tbody>
</table>
@endisset
@endisset

@isset($enquiry_id)
<a href={{ route('enquiry.answer', compact('enquiry_id'))}}>Contact User</a>
@endisset

@else
<p>404 not authorized</p>
@endif

@else
<p>Please login as admin to see the page.</p>
@endauth

@endsection