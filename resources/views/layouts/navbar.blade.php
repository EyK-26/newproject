<nav class="navbar">
    <a href="/">Home</a>
    @if($user->can('admin'))
    <a href="{{ route('offer.create') }}">Create New Offer</a>
    <a href="{{ route('offers.index') }}">List of Offers</a>
    @endif
</nav>