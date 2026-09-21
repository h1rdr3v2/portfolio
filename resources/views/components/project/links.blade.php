@props(['project'])

@php($buttons = $project->linkButtons())

@if (count($buttons) > 0)
    <div {{ $attributes->merge(['class' => 'flex flex-wrap items-center gap-2.5']) }}>
        @foreach ($buttons as $button)
            <x-ui.button-link :href="$button['url']" :icon="$button['icon']" target="_blank" rel="noopener noreferrer">{{ $button['label'] }}</x-ui.button-link>
        @endforeach
    </div>
@endif
