<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Response;

class FeedController extends Controller
{
    public function __invoke(): Response
    {
        $posts = Post::query()->published()->limit(20)->get();

        return response()
            ->view('feed', ['posts' => $posts, 'site' => config('site')])
            ->header('Content-Type', 'application/rss+xml; charset=UTF-8');
    }
}
