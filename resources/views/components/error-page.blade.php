@props(['status', 'message'])

{{-- No identity block, no footer: nothing to read here but the way out. --}}
<x-layouts.site :title="(string) $status" :header="false" footer="none">
    <section class="my-auto flex w-full flex-col items-center gap-4 text-center">
        <h1 class="text-6xl font-bold">{{ $status }}</h1>
        <p class="text-lg text-muted-foreground">{{ $message }}</p>
        <a href="{{ route('home') }}" class="text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent">Go home</a>
    </section>
</x-layouts.site>
