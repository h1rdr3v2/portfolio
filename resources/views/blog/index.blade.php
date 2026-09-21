<x-layouts.site title="Blog" :description="'Notes and posts by '.config('site.name').'.'">
    <section class="w-full">
        <div class="flex flex-wrap items-baseline justify-between gap-3">
            <h1 class="text-3xl font-bold">Blog</h1>
            <p class="font-mono text-xs text-muted-foreground">{{ $posts->count() }} {{ Str::plural('post', $posts->count()) }}</p>
        </div>
    </section>

    <section class="-mt-6 w-full">
        <x-blog.post-list :posts="$posts" :show-excerpts="true" empty="Nothing published yet — first post is on its way." />
    </section>
</x-layouts.site>
