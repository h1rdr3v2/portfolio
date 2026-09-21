<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\View\View;

class PostController extends Controller
{
    public function index(): View
    {
        return view('blog.index', [
            'posts' => Post::query()->published()->withListCounts()->get(),
        ]);
    }

    public function show(Request $request, string $slug): View
    {
        $post = Post::query()->published()->where('slug', $slug)->firstOrFail();

        $this->countView($request, $post);

        return view('blog.show', [
            'post' => $post,
            ...$this->neighbours($post),
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
