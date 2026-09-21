<footer class="flex w-full flex-col items-center gap-2.5 pt-4">
    <x-site.signature class="h-[95px] w-[160px] text-foreground" />
    <p class="text-center text-xs text-muted-foreground">© {{ now()->year }} {{ config('site.name') }}</p>
</footer>
