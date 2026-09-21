<section aria-label="Reactions">
    <h2 class="text-lg font-bold">Reactions</h2>
    <div class="mt-3 flex flex-wrap gap-2">
        @foreach ($reactions as $reaction)
            <button type="button" wire:click="toggle('{{ $reaction['emoji'] }}')" wire:loading.attr="disabled" wire:target="toggle"
                aria-pressed="{{ $reaction['mine'] ? 'true' : 'false' }}" aria-label="{{ $reaction['emoji'] }} {{ $reaction['count'] }}"
                @class([
                    'inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-base transition-all active:scale-95 disabled:opacity-70',
                    'border-accent bg-accent/15' => $reaction['mine'],
                    'border-border hover:border-accent hover:bg-accent/10' => ! $reaction['mine'],
                ])>
                <span>{{ $reaction['emoji'] }}</span>
                @if ($reaction['count'] > 0)
                    <span class="font-mono text-xs text-muted-foreground tabular-nums">{{ $reaction['count'] }}</span>
                @endif
            </button>
        @endforeach
    </div>
</section>
