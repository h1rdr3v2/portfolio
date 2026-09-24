{{-- The one thing a visitor should do next: a line of lead-in, then the booking link. --}}
<div {{ $attributes->merge(['class' => 'flex flex-wrap items-center gap-x-4 gap-y-2.5']) }}>
    <a href="{{ config('site.calendar_url') }}" target="_blank" rel="noopener noreferrer"
        class="inline-flex h-10 items-center gap-2 rounded-md bg-accent px-4 text-sm font-semibold text-background transition-opacity hover:opacity-90">
        Book a call <span aria-hidden="true">→</span>
    </a>
    @if ($slot->isNotEmpty())
        <p class="text-sm text-muted-foreground">{{ $slot }}</p>
    @endif
</div>
