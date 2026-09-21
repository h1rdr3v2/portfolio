<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $posts = Post::query()->published()->get(['slug', 'updated_at', 'published_at']);

        return response()
            ->view('sitemap', ['posts' => $posts])
            ->header('Content-Type', 'application/xml; charset=UTF-8');
    }
}
