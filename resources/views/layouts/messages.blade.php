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
    @if (session('message_error'))
    <li class="li_message">{{ session('message_error') }}</li>
    @endif
</ul>