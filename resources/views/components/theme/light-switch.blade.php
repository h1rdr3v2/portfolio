{{-- A light bulb beside the name. Off in the dark; lit when the light is on. --}}
<button
    type="button"
    x-data="lightSwitch"
    @click="flip()"
    :aria-label="lit ? 'Take the light' : 'Bring the light'"
    :title="lit ? 'Take the light' : 'Bring the light'"
    {{ $attributes->merge(['class' => 'group inline-flex size-9 cursor-pointer items-center justify-center rounded-full transition-transform active:scale-90']) }}
>
    <svg
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
        class="size-6 transition-[color,filter] duration-300"
        :class="lit ? 'text-amber-400 drop-shadow-[0_0_8px_rgb(251_191_36/0.9)]' : 'text-muted-foreground group-hover:text-foreground'"
    >
        <path
            d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"
            :fill="lit ? 'currentColor' : 'none'" :fill-opacity="lit ? 0.35 : 0" class="transition-[fill-opacity] duration-300"
        />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <g class="origin-center transition-opacity duration-300" :class="lit ? 'opacity-100' : 'opacity-0'">
            <path d="M12 1.5v1" /><path d="M4.6 4.6l.7.7" /><path d="M19.4 4.6l-.7.7" /><path d="M2 10.5h1" /><path d="M21 10.5h1" />
        </g>
    </svg>
</button>
