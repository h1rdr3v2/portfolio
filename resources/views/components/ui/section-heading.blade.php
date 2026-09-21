@props(['aside' => null])

{{-- Every section is introduced the same way: one line, bold, nothing else. --}}
<div {{ $attributes->merge(['class' => 'flex flex-wrap items-center justify-between gap-x-4 gap-y-3']) }}>
    <h2 class="text-xl font-bold">{{ $slot }}</h2>
    {{ $aside }}
</div>
