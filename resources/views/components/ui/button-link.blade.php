@props(['icon' => null])

{{-- A small outlined button that is really a link — every use goes somewhere. --}}
<a {{ $attributes->merge(['class' => 'inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-3 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent']) }}>
    @if ($icon)
        <x-ui.icon :name="$icon" class="size-3.5" />
    @endif
    {{ $slot }}
</a>
