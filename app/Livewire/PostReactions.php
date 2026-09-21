<?php

namespace App\Livewire;

use App\Models\Post;
use App\Models\Reaction;
use App\Services\ReaderFingerprint;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\View\View;
use Livewire\Component;

/**
 * Emoji reactions under a post. Anonymous; a second tap on the same emoji
 * takes it back. The reader is told apart by a fingerprint, never by an
 * account.
 */
class PostReactions extends Component
{
    public Post $post;

    public function toggle(string $emoji, ReaderFingerprint $fingerprint): void
    {
        if (! in_array($emoji, Reaction::EMOJIS, true) || ! $this->post->isPublished()) {
            return;
        }

        $reader = $fingerprint->for(request());

        if (RateLimiter::tooManyAttempts('reactions:'.$reader, 60)) {
            return;
        }
        RateLimiter::hit('reactions:'.$reader, 60);

        $attributes = ['emoji' => $emoji, 'fingerprint' => $reader];
        $existing = $this->post->reactions()->where($attributes)->first();

        if ($existing) {
            $existing->delete();
        } else {
            $this->post->reactions()->create($attributes);
        }
    }

    public function render(ReaderFingerprint $fingerprint): View
    {
        $reader = $fingerprint->for(request());

        $tallies = $this->post->reactions()
            ->selectRaw('emoji, count(*) as total, sum(case when fingerprint = ? then 1 else 0 end) as mine', [$reader])
            ->groupBy('emoji')
            ->get()
            ->keyBy('emoji');

        return view('livewire.post-reactions', [
            'reactions' => collect(Reaction::EMOJIS)->map(fn (string $emoji): array => [
                'emoji' => $emoji,
                'count' => (int) ($tallies[$emoji]->total ?? 0),
                'mine' => (bool) ($tallies[$emoji]->mine ?? false),
            ]),
        ]);
    }
}
