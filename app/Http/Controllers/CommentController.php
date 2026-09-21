<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Models\Post;
use App\Services\ReaderFingerprint;
use Illuminate\Http\RedirectResponse;

class CommentController extends Controller
{
    public function store(StoreCommentRequest $request, ReaderFingerprint $fingerprint, Post $post): RedirectResponse
    {
        abort_unless($post->isPublished(), 404);

        $post->comments()->create([
            'name' => $request->string('name')->trim()->toString(),
            'body' => $request->string('body')->trim()->toString(),
            'fingerprint' => $fingerprint->for($request),
        ]);

        return back()->with('status', 'comment-posted');
    }
}
