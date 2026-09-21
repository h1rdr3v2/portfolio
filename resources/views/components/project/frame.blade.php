@props(['project', 'eager' => false])

@php
    $images = $project->imageEntries();
    $first = $images[0] ?? null;
    $portrait = $first && $first['width'] && $first['height'] && $first['height'] > $first['width'];
    $strip = $portrait && count($images) >= 2;
@endphp

{{-- The screenshots in the first site's bordered frame. Phone shots stand three
     abreast; a wide shot fills the frame with a thumbnail strip under it.
     Either way a click opens the full-size viewer. --}}
@if (count($images) === 0)
    <div class="flex h-40 w-full items-center justify-center rounded-lg border-2 border-frame bg-card">
        <span class="text-5xl font-bold text-muted-foreground/30 select-none">{{ Str::substr($project->name, 0, 1) }}</span>
    </div>
@else
    <div x-data="lightbox({{ Js::from($images) }})" class="group/frame">
        @if ($strip)
            <button type="button" @click="show(0)" aria-label="Open {{ $project->name }} screenshots"
                class="flex w-full cursor-pointer items-end justify-center gap-3 overflow-hidden rounded-lg border-2 border-frame bg-card px-5 pt-5">
                @foreach (array_slice($images, 0, 3) as $index => $image)
                    <img src="{{ $image['url'] }}" alt="{{ $project->name }} — screenshot {{ $index + 1 }}"
                        width="{{ $image['width'] }}" height="{{ $image['height'] }}"
                        loading="{{ $eager && $index === 0 ? 'eager' : 'lazy' }}" decoding="async"
                        class="w-[31%] rounded-t-lg shadow-[0_-8px_30px_-10px_rgb(0_0_0/0.5)] transition-transform duration-500 group-hover/frame:-translate-y-1">
                @endforeach
            </button>
        @else
            <button type="button" @click="show(active)" aria-label="Open {{ $project->name }} screenshots"
                class="block w-full cursor-pointer overflow-hidden rounded-lg border-2 border-frame bg-card">
                <img :src="images[active].url" src="{{ $first['url'] }}" alt="{{ $project->name }} — screenshot"
                    width="{{ $first['width'] }}" height="{{ $first['height'] }}"
                    loading="{{ $eager ? 'eager' : 'lazy' }}" decoding="async"
                    class="max-h-[420px] w-full object-cover object-top transition-transform duration-500 group-hover/frame:scale-[1.02]">
            </button>

            @if (count($images) > 1)
                <div class="mt-2 flex gap-2">
                    @foreach (array_slice($images, 0, 4) as $index => $image)
                        <button type="button" @click="active = {{ $index }}" :aria-current="active === {{ $index }}" aria-label="Show screenshot {{ $index + 1 }}"
                            class="size-14 shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition-colors"
                            :class="active === {{ $index }} ? 'border-frame' : 'border-frame/20 hover:border-frame'">
                            <img src="{{ $image['url'] }}" alt="" loading="lazy" decoding="async" class="size-full object-cover">
                        </button>
                    @endforeach
                    @if (count($images) > 4)
                        <button type="button" @click="show(4)"
                            class="flex size-14 shrink-0 cursor-pointer items-center justify-center rounded-md border-2 border-frame/20 text-xs text-muted-foreground transition-colors hover:border-frame">
                            +{{ count($images) - 4 }}
                        </button>
                    @endif
                </div>
            @endif
        @endif

        {{-- The full-size viewer. --}}
        <dialog x-ref="dialog" @close="open = false" @click.self="close()" @keydown.escape.prevent="close()"
            @keydown.left.window="open && previous()" @keydown.right.window="open && next()"
            aria-label="{{ $project->name }} screenshots"
            class="m-auto max-h-[90vh] w-[min(1100px,calc(100vw-2rem))] rounded-xl border-0 bg-transparent p-0 text-foreground backdrop:bg-black/60 backdrop:backdrop-blur-[2px]">
            <div class="relative flex h-[88vh] items-center justify-center">
                <template x-if="open">
                    <img :src="images[index].url" :alt="'{{ addslashes($project->name) }} — screenshot ' + (index + 1) + ' of ' + count"
                        class="max-h-full max-w-full rounded-lg object-contain">
                </template>

                <button type="button" @click="close()" aria-label="Close"
                    class="absolute top-2 right-2 inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80">
                    <x-ui.icon name="close" class="size-4" />
                </button>

                @if (count($images) > 1)
                    <button type="button" @click="previous()" aria-label="Previous screenshot"
                        class="absolute top-1/2 left-2 inline-flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80">
                        <x-ui.icon name="left" class="size-5" />
                    </button>
                    <button type="button" @click="next()" aria-label="Next screenshot"
                        class="absolute top-1/2 right-2 inline-flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80">
                        <x-ui.icon name="right" class="size-5" />
                    </button>
                    <p class="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 font-mono text-xs text-white">
                        <span x-text="index + 1"></span> / {{ count($images) }}
                    </p>
                @endif
            </div>
        </dialog>
    </div>
@endif
