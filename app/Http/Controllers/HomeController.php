<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Project;
use App\Models\Role;
use App\Models\Snippet;
use Illuminate\View\View;

class HomeController extends Controller
{
    /** The homepage never lists more than this many posts; the rest live at /blog. */
    private const int POST_LIMIT = 3;

    public function __invoke(): View
    {
        $roles = Role::query()->ordered()->get();
        $publishedPosts = Post::query()->published()->withListCounts();

        return view('home', [
            'now' => Snippet::html('now'),
            'featured' => Project::query()->featured()->get(),
            'projects' => Project::query()->notFeatured()->get(),
            'posts' => (clone $publishedPosts)->limit(self::POST_LIMIT)->get(),
            'postCount' => (clone $publishedPosts)->count(),
            'currentRoles' => $roles->where('is_current', true)->values(),
            'formerRoles' => $roles->where('is_current', false)->values(),
        ]);
    }
}
