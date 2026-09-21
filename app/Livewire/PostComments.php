<?php

namespace App\Livewire;

use App\Models\Post;
use App\Services\ReaderFingerprint;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\View\View;
use Livewire\Attributes\Validate;
use Livewire\Component;

/** Anonymous comments under a post, with a honeypot and a rate limit standing in for a login. */
class PostComments extends Component
{
    public Post $post;

    public bool $open = false;

    #[Validate('required|string|min:2|max:60', onUpdate: false)]
    public string $name = '';

    #[Validate('required|string|min:2|max:2000', onUpdate: false)]
    public string $body = '';

    /** A field no person sees; bots fill everything in. */
    #[Validate('max:0', onUpdate: false, message: 'Something went wrong. Please try again.')]
    public string $website = '';

    public function send(ReaderFingerprint $fingerprint): void
    {
        $this->validate();

        if (! $this->post->isPublished()) {
            return;
        }

        $reader = $fingerprint->for(request());

        if (RateLimiter::tooManyAttempts('comments:'.$reader, 5)) {
            $this->addError('body', 'Too many comments in a short time. Give it a few minutes.');

            return;
        }
        RateLimiter::hit('comments:'.$reader, 600);

        $this->post->comments()->create([
            'name' => trim($this->name),
            'body' => trim($this->body),
            'fingerprint' => $reader,
        ]);

        $this->reset('name', 'body', 'website', 'open');
    }

    public function render(): View
    {
        return view('livewire.post-comments', [
            'comments' => $this->post->comments()->oldest()->get(),
        ]);
    }
}
