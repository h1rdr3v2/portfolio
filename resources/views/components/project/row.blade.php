@props(['project'])

{{-- One project as a line: name and when on the left, what it is on the right.
     Clicking opens its dialog with the screens and the whole story. --}}
<div x-data="{ open: false }" class="contents">
    <button type="button" @click="$refs.dialog.showModal(); open = true"
        class="group grid w-full cursor-pointer grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 border-b border-border py-3.5 text-left sm:grid-cols-[150px_1fr_auto]">
        <span class="min-w-0">
            <span class="block text-sm font-semibold text-foreground transition-colors group-hover:text-accent">{{ $project->name }}</span>
            <span class="block font-mono text-xs text-muted-foreground">{{ $project->year }}</span>
        </span>
        <span class="col-span-2 line-clamp-2 text-[13.5px] leading-snug text-muted-foreground sm:col-span-1">{{ $project->summary() }}</span>
        <span aria-hidden="true" class="col-start-2 row-start-1 text-sm text-muted-foreground transition-[transform,color] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent sm:col-start-3">↗</span>
    </button>

    <dialog x-ref="dialog" @close="open = false" @click.self="$el.close()" @keydown.escape.prevent="$el.close()"
        aria-label="{{ $project->name }}"
        class="m-auto max-h-[90vh] w-[min(720px,calc(100vw-2rem))] rounded-xl border border-border bg-background p-0 text-foreground shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-[2px]">
        <template x-if="open">
            <div class="max-h-[90vh] overflow-y-auto p-6 md:p-8">
                <div class="flex items-start justify-between gap-4">
                    <p class="font-mono text-xs text-muted-foreground">{{ $project->category->getLabel() }} · {{ $project->year }}</p>
                    <button type="button" @click="$refs.dialog.close()" aria-label="Close"
                        class="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border transition-colors hover:border-accent hover:text-accent">
                        <x-ui.icon name="close" class="size-4" />
                    </button>
                </div>

                <div class="mt-3 flex flex-wrap items-center gap-3">
                    <h2 class="text-2xl leading-tight font-bold">{{ $project->name }}</h2>
                    <x-ui.label>{{ $project->year }}</x-ui.label>
                </div>

                @if (count($project->images ?? []) > 0)
                    <div class="mt-5">
                        <x-project.frame :project="$project" :eager="true" />
                    </div>
                @endif

                @if ($project->description)
                    <p class="mt-4 text-[15px] leading-relaxed text-foreground/90">{{ $project->description }}</p>
                @endif

                @if ($project->story)
                    <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{{ $project->story }}</p>
                @endif

                <x-project.case-study :project="$project" class="mt-5" />

                <x-ui.tag-list :items="$project->tools ?? []" class="mt-4" />

                <x-project.links :project="$project" class="mt-4" />
            </div>
        </template>
    </dialog>
</div>
