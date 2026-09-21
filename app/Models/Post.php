<?php

namespace App\Models;

use App\Services\ImageOptimizer;
use App\Services\Markdown;
use Database\Factories\PostFactory;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

/**
 * @property array<int, string>|null $tags
 * @property Carbon|null $published_at
 */
class Post extends Model
{
    /** @use HasFactory<PostFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'body',
        'body_html',
        'cover_image',
        'tags',
        'reading_minutes',
        'views',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'tags' => 'array',
            'published_at' => 'datetime',
        ];
    }

    /** Markdown is rendered once here, on save, whatever saved it. */
    protected static function booted(): void
    {
        static::saving(function (Post $post): void {
            if ($post->isDirty('cover_image') && $post->cover_image !== null) {
                $post->cover_image = app(ImageOptimizer::class)->toWebp($post->cover_image);
            }

            if ($post->isDirty('body') || $post->body_html === null) {
                $markdown = app(Markdown::class);
                $post->body_html = $markdown->toHtml($post->body);
                $post->reading_minutes = $markdown->readingMinutes($post->body);
            }
        });
    }

    public function reactions(): HasMany
    {
        return $this->hasMany(Reaction::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    #[Scope]
    protected function published(Builder $query): Builder
    {
        return $query
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->orderByDesc('published_at')
            ->orderByDesc('id');
    }

    /**
     * What a list row needs: comment count, and reactions grouped by emoji so
     * the row can show "👍 4" rather than a bare total.
     */
    #[Scope]
    protected function withListCounts(Builder $query): Builder
    {
        return $query
            ->withCount('comments')
            ->with(['reactions' => fn ($reactions) => $reactions
                ->select('post_id', 'emoji')
                ->selectRaw('count(*) as total')
                ->groupBy('post_id', 'emoji')]);
    }

    public function isPublished(): bool
    {
        return $this->published_at !== null && $this->published_at->isPast();
    }

    public function coverImageUrl(): ?string
    {
        if ($this->cover_image === null) {
            return null;
        }

        return str_starts_with($this->cover_image, '/') || str_starts_with($this->cover_image, 'http')
            ? $this->cover_image
            : Storage::disk('public')->url($this->cover_image);
    }

    /**
     * The list-row shape: everything but the body.
     *
     * @return array<string, mixed>
     */
    public function toListArray(): array
    {
        $reactions = $this->relationLoaded('reactions')
            ? $this->reactions->sortByDesc('total')->values()
            : collect();

        return [
            'slug' => $this->slug,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'tags' => $this->tags ?? [],
            'readingMinutes' => $this->reading_minutes,
            'views' => $this->views,
            'publishedAt' => $this->published_at?->toIso8601String(),
            'reactionsCount' => (int) $reactions->sum('total'),
            'topReactions' => $reactions->take(2)->map(fn (Reaction $reaction): array => [
                'emoji' => $reaction->emoji,
                'count' => (int) $reaction->total,
            ])->all(),
            'commentsCount' => (int) ($this->comments_count ?? 0),
        ];
    }
}
