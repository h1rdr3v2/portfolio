<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Project;
use App\Models\Role;
use App\Models\Snippet;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /** The homepage never lists more than this many posts; the rest live at /blog. */
    private const int POST_LIMIT = 3;

    public function __invoke(): Response
    {
        $roles = Role::query()->ordered()->get();
        $publishedPosts = Post::query()->published()->withListCounts();

        return Inertia::render('home', [
            'now' => Snippet::html('now'),
            'featured' => Project::query()->featured()->get()->map->toPageArray(),
            'projects' => Project::query()->notFeatured()->get()->map->toPageArray(),
            'posts' => (clone $publishedPosts)->limit(self::POST_LIMIT)->get()->map->toListArray(),
            'postCount' => (clone $publishedPosts)->count(),
            'currentRoles' => $roles->where('is_current', true)->values()->map->toPageArray(),
            'formerRoles' => $roles->where('is_current', false)->values()->map->toPageArray(),
        ]);
    }
}
