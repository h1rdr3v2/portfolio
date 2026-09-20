<?php

namespace App\Models;

use App\Services\Markdown;
use Database\Factories\SnippetFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * A block of prose edited from the admin and rendered somewhere fixed on the
 * site, looked up by key — `now` is the "What I'm working on" section.
 */
class Snippet extends Model
{
    /** @use HasFactory<SnippetFactory> */
    use HasFactory;

    protected $fillable = ['key', 'title', 'body', 'body_html'];

    protected static function booted(): void
    {
        static::saving(function (Snippet $snippet): void {
            if ($snippet->isDirty('body') || $snippet->body_html === null) {
                $snippet->body_html = app(Markdown::class)->toHtml($snippet->body);
            }
        });
    }

    public static function html(string $key): ?string
    {
        return static::query()->where('key', $key)->value('body_html');
    }
}
