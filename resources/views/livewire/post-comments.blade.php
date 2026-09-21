<section aria-label="Comments">
    <div class="flex items-center justify-between gap-4">
        <h2 class="text-lg font-bold">Comments</h2>
        @unless ($open)
            <button type="button" wire:click="$set('open', true)"
                class="cursor-pointer rounded-md bg-accent px-3.5 py-2 text-xs font-semibold text-background transition-opacity hover:opacity-85">
                Leave a comment
            </button>
        @endunless
    </div>

    @if ($open)
        <form wire:submit="send" class="mt-4 flex flex-col gap-3 rounded-lg bg-card p-4">
            <label class="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
                Name
                <input type="text" wire:model="name" maxlength="60" required autocomplete="name"
                    @class([
                        'rounded-md border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent',
                        'border-red-500' => $errors->has('name'),
                        'border-border' => ! $errors->has('name'),
                    ])>
                @error('name') <span class="text-red-500">{{ $message }}</span> @enderror
            </label>

            <label class="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
                Comment
                <textarea wire:model="body" maxlength="2000" rows="4" required
                    @class([
                        'rounded-md border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent',
                        'border-red-500' => $errors->has('body'),
                        'border-border' => ! $errors->has('body'),
                    ])></textarea>
                @error('body') <span class="text-red-500">{{ $message }}</span> @enderror
            </label>

            {{-- Honeypot: hidden from people, filled in by bots, rejected by the server. --}}
            <input type="text" wire:model="website" tabindex="-1" autocomplete="off" aria-hidden="true" class="hidden">
            @error('website') <span class="text-xs text-red-500">{{ $message }}</span> @enderror

            <div class="flex items-center gap-3">
                <button type="submit" wire:loading.attr="disabled" wire:target="send"
                    class="cursor-pointer rounded-md bg-accent px-3.5 py-2 text-xs font-semibold text-background transition-opacity hover:opacity-85 disabled:opacity-50">
                    <span wire:loading.remove wire:target="send">Post comment</span>
                    <span wire:loading wire:target="send">Posting…</span>
                </button>
                <button type="button" wire:click="$set('open', false)" class="cursor-pointer text-xs text-muted-foreground transition-colors hover:text-accent">Cancel</button>
            </div>
        </form>
    @endif

    @if ($comments->isEmpty())
        <p class="mt-4 text-sm text-muted-foreground italic">No comments yet. Be the first to share your thoughts.</p>
    @else
        <ul class="mt-4 flex flex-col gap-4">
            @foreach ($comments as $comment)
                <li class="rounded-lg bg-card p-4" wire:key="comment-{{ $comment->id }}">
                    <div class="flex items-baseline justify-between gap-3">
                        <span class="text-sm font-semibold">{{ $comment->name }}</span>
                        <time datetime="{{ $comment->created_at->toIso8601String() }}" class="font-mono text-xs text-muted-foreground">{{ $comment->created_at->format('M j, Y') }}</time>
                    </div>
                    <p class="mt-1.5 text-sm leading-relaxed whitespace-pre-line text-foreground/85">{{ $comment->body }}</p>
                </li>
            @endforeach
        </ul>
    @endif
</section>
