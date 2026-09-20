<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\FeedController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ReactionController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::get('/blog', [PostController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [PostController::class, 'show'])->name('blog.show');

Route::post('/blog/{post:slug}/reactions', [ReactionController::class, 'store'])
    ->middleware('throttle:60,1')
    ->name('blog.reactions.store');

Route::post('/blog/{post:slug}/comments', [CommentController::class, 'store'])
    ->middleware('throttle:5,10')
    ->name('blog.comments.store');

Route::get('/rss.xml', FeedController::class)->name('feed');
Route::get('/sitemap.xml', SitemapController::class)->name('sitemap');
