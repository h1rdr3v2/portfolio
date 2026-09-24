@props(['project'])

{{-- The client's side of a project: the numbers, what was in the way, what changed. Nothing when none of it is filled in. --}}
@if ($project->hasCaseStudy())
    <div {{ $attributes->merge(['class' => 'flex flex-col gap-4']) }}>
        @if (filled($project->metrics))
            <dl class="grid grid-cols-2 gap-2.5 sm:grid-flow-col sm:grid-cols-none sm:auto-cols-fr">
                @foreach ($project->metrics as $metric)
                    <div class="flex flex-col-reverse rounded-lg bg-card px-3.5 py-3">
                        <dt class="text-xs leading-snug text-muted-foreground">{{ $metric['label'] }}</dt>
                        <dd class="text-xl font-bold tabular-nums">{{ $metric['value'] }}</dd>
                    </div>
                @endforeach
            </dl>
        @endif

        @if (filled($project->problem) || filled($project->outcome))
            <dl class="grid gap-4 sm:grid-cols-2">
                @if (filled($project->problem))
                    <div>
                        <dt class="font-mono text-xs text-muted-foreground">The problem</dt>
                        <dd class="mt-1 text-sm leading-relaxed text-foreground/90">{{ $project->problem }}</dd>
                    </div>
                @endif
                @if (filled($project->outcome))
                    <div>
                        <dt class="font-mono text-xs text-muted-foreground">The result</dt>
                        <dd class="mt-1 text-sm leading-relaxed text-foreground/90">{{ $project->outcome }}</dd>
                    </div>
                @endif
            </dl>
        @endif
    </div>
@endif
