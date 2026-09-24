@props(['project', 'eager' => false])

{{-- A featured project the way the first site showed one: screens, then the story. --}}
<article class="w-full">
    <x-project.frame :project="$project" :eager="$eager" />

    <div class="mt-5 flex flex-wrap items-center gap-3">
        <h3 class="text-2xl leading-tight font-bold">{{ $project->name }}</h3>
        <x-ui.label>{{ $project->year }}</x-ui.label>
    </div>

    @if ($project->description)
        <p class="mt-2.5 text-[15px] leading-relaxed text-foreground/90">{{ $project->description }}</p>
    @endif

    <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{{ $project->story }}</p>

    <x-project.case-study :project="$project" class="mt-4" />

    <x-ui.tag-list :items="$project->tools ?? []" class="mt-3" />

    <x-project.links :project="$project" class="mt-3.5" />
</article>
