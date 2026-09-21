<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReactionRequest;
use App\Models\Post;
use App\Services\ReaderFingerprint;
use Illuminate\Http\RedirectResponse;

class ReactionController extends Controller
{
    /** Toggles: a second tap on the same emoji takes it back. */
    public function store(StoreReactionRequest $request, ReaderFingerprint $fingerprint, Post $post): RedirectResponse
    {
        abort_unless($post->isPublished(), 404);

        $attributes = [
            'emoji' => $request->string('emoji')->toString(),
            'fingerprint' => $fingerprint->for($request),
        ];

        $existing = $post->reactions()->where($attributes)->first();

        if ($existing) {
            $existing->delete();
        } else {
            $post->reactions()->create($attributes);
        }

        return back();
    }
}
