@extends('layouts.layout')

@section('content')
@if($user->can('admin') && auth()->check())
<div class="create_question__container">
    @if (!empty($question))
    <h2>Edit Question</h2>
    <form action="{{ route('questions.update', ['question_id' => $question->id]) }}" method="post">
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
                @for($i = 0; $i
                <= 4; $i++) <input type="text" name="quizanswers[]" id="quizanswers_{{ $i }}" value="{{ old(" text.$i",
                    isset($question->quizanswers[$i]) ? $question->quizanswers[$i]->text : '') }}"
                    required />
                    <label for="quizanswers_correct_{{ $i }}">Correct</label>
                    <input type="checkbox" name="quizanswers_correct[{{ $i }}]" id="quizanswers_correct_{{ $i }}"
                        @if(old("quizanswers_correct.$i", isset($question->quizanswers[$i]) &&
                    $question->quizanswers[$i]->is_correct))
                    checked
                    @endif
                    />
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