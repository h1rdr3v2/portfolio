@props(['post', 'showExcerpt' => false])

@php
    $signals = [];
    foreach ($post->topReactions() as $reaction) {
        $signals[] = $reaction['emoji'].' '.$reaction['count'];
    }
    $reactions = implode('  ', $signals);
    $comments = $post->comments_count ?? 0;
@endphp

{{-- One post in a list. A whole-row link: a post is a page with a URL you can share. --}}
<a href="{{ route('blog.show', $post->slug) }}"
    class="group flex flex-col gap-1 border-b border-border py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
    <span class="min-w-0">
        <span class="block text-[15px] font-medium text-foreground transition-colors group-hover:text-accent">{{ $post->title }}</span>
        @if ($showExcerpt && $post->excerpt)
            <span class="mt-1 block text-sm leading-snug text-muted-foreground">{{ $post->excerpt }}</span>
        @endif
    </span>
    <span class="flex shrink-0 gap-3 font-mono text-xs whitespace-nowrap text-muted-foreground">
        @if ($reactions !== '')
            <span>{{ $reactions }}</span>
        @endif
        @if ($comments > 0)
            <span>{{ $comments }} {{ Str::plural('comment', $comments) }}</span>
        @endif
        <time datetime="{{ $post->published_at?->toIso8601String() }}">{{ $post->published_at?->format('M j, Y') }}</time>
    </span>
</a>
