@props(['posts', 'showExcerpts' => false, 'empty' => 'Nothing here yet.'])

@if ($posts->isEmpty())
    <p class="py-6 text-sm text-muted-foreground">{{ $empty }}</p>
@else
    <div class="border-t border-border">
        @foreach ($posts as $post)
            <x-blog.post-row :post="$post" :show-excerpt="$showExcerpts" />
        @endforeach
    </div>
@endif
