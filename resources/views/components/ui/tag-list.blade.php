@props(['items' => []])

@if (count($items) > 0)
    <div {{ $attributes->merge(['class' => 'flex flex-wrap gap-1.5']) }}>
        @foreach ($items as $item)
            <span class="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-foreground">{{ $item }}</span>
        @endforeach
    </div>
@endif
