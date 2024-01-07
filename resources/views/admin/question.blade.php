@extends('layouts.layout')

@section('content')
@if($user->can('admin') && auth()->check())
<div class="create_question__container">
    @if (!empty($question))
    <h2>Edit Question</h2>
    <form action="{{ route('questions.update', ['question' => $question->id]) }}" method="post">
        @else
        <h2>Create New Question</h2>
        <form action="{{ route('questions.store') }}" method="post">
            @endif
            @csrf
            <input type="hidden" name="user_id" value="{{ $user->id }}">

            <div>
                <label for="text">Question</label>
                <textarea name="text" id="text" style="resize: none"
                    required>{{ old('text', isset($question) ? $question->text : '') }}</textarea>
            </div>

            <div>
                <label>Answers</label>
                @for($i = 0; $i <= 4; $i++) <div>
                    <input type="text" name="answers[]" id="answer{{ $i }}"
                        value="{{ old('answers.'.$i, optional($question->answers[$i - 1])->answer) }}" required>
                    <input type="checkbox" name="correct_answers[]" id="correct_answer{{ $i }}" value="{{ $i }}" {{
                        (old('correct_answers.'.$i) || (optional($question->answers[$i - 1])->is_correct)) ? 'checked' :
                    '' }}>
                    <label for="correct_answer{{ $i }}">Correct Answer</label>
            </div>
            @endfor
</div>

<div>
    @if (!empty($question))
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