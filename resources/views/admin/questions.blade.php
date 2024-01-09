@extends('layouts.layout')

@section('content')
@include('layouts.messages')
@if(auth()->check() && $user->can('admin'))
@if(isset($questions))
<div class="offers_container">

    @foreach ($questions as $question)
    <div class="offer">
        <h4>{{ $question->text }}</h4>
        <ul>
            @for($i = 0; $i < count($question->quizanswers); $i++)
                @php
                $quizanswer = $question->quizanswers[$i];
                @endphp
                <li>{{ $quizanswer->text }}</li>
                @if($quizanswer->is_correct)
                <input type="checkbox" name="is_checked[]" id="is_checked{{ $i }}" disabled checked>
                @else
                <input type="checkbox" name="is_not_checked[]" id="is_not_checked{{ $i }}" disabled>
                @endif
                @endfor
        </ul>
        <a href="{{ route('questions.edit', ['question' => $question->id]) }}">Edit question</a>
        <form action="{{ route('questions.destroy', ['question' => $question->id]) }}" method="post">
            @csrf
            @method('DELETE')
            <button type="submit">Delete this question</button>
        </form>
    </div>
    @endforeach

    {{ $questions->links() }}
</div>
@else
<h4>No questions yet</h4>
@endif
@else
<h1>404. Not Authorized.</h1>
@endif

@endsection