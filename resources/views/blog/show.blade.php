<x-layouts.site :title="$post->title" :description="$post->excerpt ?: null" :image="$post->coverImageUrl()" type="article" :published-at="$post->published_at?->toIso8601String()">
    {{-- The hairline at the top showing how far through the post you are. --}}
    <div x-data="readingProgress" aria-hidden="true" class="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent" :style="`transform: scaleX(${progress / 100})`"></div>

    <article class="w-full">
        <a href="{{ route('blog.index') }}" class="font-mono text-xs text-muted-foreground transition-colors hover:text-accent">← All posts</a>

        <header class="mt-6">
            <h1 class="text-3xl leading-tight font-bold">{{ $post->title }}</h1>
            @if ($post->excerpt)
                <p class="mt-2 text-muted-foreground">{{ $post->excerpt }}</p>
            @endif
            <p class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
                <span>Published on <time datetime="{{ $post->published_at?->toIso8601String() }}" class="text-foreground">{{ $post->published_at?->format('M j, Y') }}</time></span>
                <span aria-hidden="true">·</span>
                <span>{{ $post->reading_minutes }} min read</span>
                <span aria-hidden="true">·</span>
                <span class="inline-flex items-center gap-1"><x-ui.icon name="eye" class="size-3.5" /> {{ $post->views }} {{ Str::plural('view', $post->views) }}</span>
            </p>
            <x-ui.tag-list :items="$post->tags ?? []" class="mt-4" />
        </header>

        @if ($post->coverImageUrl())
            <img src="{{ $post->coverImageUrl() }}" alt="" class="mt-6 w-full rounded-lg border border-border object-cover">
        @endif

        {{-- The HTML the server produced from the author's markdown, raw HTML disallowed. --}}
        <div class="prose prose-post mt-8 w-full max-w-none prose-headings:font-bold prose-headings:tracking-tight">{!! $post->body_html !!}</div>
    </article>

    <div class="w-full border-t border-border pt-10">
        <livewire:post-reactions :post="$post" />
    </div>

    <div class="w-full border-t border-border pt-10">
        <livewire:post-comments :post="$post" />
    </div>

    @if ($previous || $next)
        <nav aria-label="More posts" class="grid w-full gap-3 border-t border-border pt-8 sm:grid-cols-2">
            @if ($previous)
                <a href="{{ route('blog.show', $previous->slug) }}" class="group rounded-lg bg-card p-4 transition-colors hover:bg-muted">
                    <span class="font-mono text-xs text-muted-foreground">← Previous</span>
                    <span class="mt-1 block text-sm font-medium transition-colors group-hover:text-accent">{{ $previous->title }}</span>
                </a>
            @else
                <span></span>
            @endif
            @if ($next)
                <a href="{{ route('blog.show', $next->slug) }}" class="group rounded-lg bg-card p-4 text-right transition-colors hover:bg-muted sm:col-start-2">
                    <span class="font-mono text-xs text-muted-foreground">Next →</span>
                    <span class="mt-1 block text-sm font-medium transition-colors group-hover:text-accent">{{ $next->title }}</span>
                </a>
            @endif
        </nav>
    @endif
</x-layouts.site>
