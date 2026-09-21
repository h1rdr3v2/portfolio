{{-- The lightest possible end of a page: a hairline, the year, the feed. The signature is the homepage's. --}}
<footer class="flex w-full items-center justify-between gap-4 border-t border-border pt-5 text-xs text-muted-foreground">
    <span>© {{ now()->year }} {{ config('site.name') }}</span>
    <a href="{{ route('feed') }}" class="transition-colors hover:text-accent">RSS</a>
</footer>
