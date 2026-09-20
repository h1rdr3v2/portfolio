<?php

namespace App\Models;

use Database\Factories\ReactionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reaction extends Model
{
    /** @use HasFactory<ReactionFactory> */
    use HasFactory;

    /** The set a reader can pick from, in display order. */
    public const array EMOJIS = ['👍', '❤️', '🔥', '🎉', '🤔', '💡'];

    protected $fillable = ['post_id', 'emoji', 'fingerprint'];

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
