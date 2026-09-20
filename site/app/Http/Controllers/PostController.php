<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Reaction;
use App\Services\ReaderFingerprint;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(): Response
    {
        $posts = Post::query()
            ->published()
            ->withListCounts()
            ->get()
            ->map->toListArray();

        return Inertia::render('blog/index', [
            'posts' => $posts,
            'meta' => [
                'title' => 'Blog — '.config('site.name'),
                'description' => 'Notes and posts by '.config('site.name').'.',
            ],
        ]);
    }

    public function show(Request $request, ReaderFingerprint $fingerprint, string $slug): Response
    {
        $post = Post::query()->published()->where('slug', $slug)->firstOrFail();

        $this->countView($request, $post);

        $reader = $fingerprint->for($request);
        $reactions = $post->reactions()
            ->selectRaw('emoji, count(*) as total, sum(case when fingerprint = ? then 1 else 0 end) as mine', [$reader])
            ->groupBy('emoji')
            ->get()
            ->keyBy('emoji');

        $neighbours = $this->neighbours($post);

        return Inertia::render('blog/show', [
            'post' => [
                ...$post->toListArray(),
                'html' => $post->body_html,
                'coverImage' => $post->coverImageUrl(),
            ],
            'reactions' => collect(Reaction::EMOJIS)->map(fn (string $emoji): array => [
                'emoji' => $emoji,
                'count' => (int) ($reactions[$emoji]->total ?? 0),
                'mine' => (bool) ($reactions[$emoji]->mine ?? false),
            ])->values(),
            'comments' => $post->comments()->oldest()->get()->map->toPageArray(),
            'previous' => $neighbours['previous']?->only(['slug', 'title']),
            'next' => $neighbours['next']?->only(['slug', 'title']),
            'meta' => [
                'title' => $post->title.' — '.config('site.name'),
                'description' => $post->excerpt ?: config('site.description'),
                'image' => $post->coverImageUrl(),
                'type' => 'article',
                'publishedAt' => $post->published_at?->toIso8601String(),
            ],
        ]);
    }

    /** Once per session per post, so a refresh is not a new reader. */
    private function countView(Request $request, Post $post): void
    {
        $key = 'viewed.'.$post->id;

        if ($request->session()->has($key)) {
            return;
        }

        $request->session()->put($key, true);
        $post->increment('views');
    }

    /**
     * The posts either side of this one in reverse-chronological order.
     *
     * @return array{previous: Post|null, next: Post|null}
     */
    private function neighbours(Post $post): array
    {
        return [
            'previous' => Post::query()->published()
                ->where('published_at', '<', $post->published_at)
                ->first(),
            'next' => Post::query()->published()
                ->where('published_at', '>', $post->published_at)
                ->reorder()->orderBy('published_at')->orderBy('id')
                ->first(),
        ];
    }
}
