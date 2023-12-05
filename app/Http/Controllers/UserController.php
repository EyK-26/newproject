<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show(string $id): array
    {
        $user = User::findOrFail($id);
        return ['name' => $user->name, 'email' => $user->email, 'member_since' => $user->created_at];
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
