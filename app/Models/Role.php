<?php

namespace App\Models;

use Database\Factories\RoleFactory;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * A role on the experience list — current ones get a card, former ones a row.
 *
 * @property array<int, string>|null $description
 */
class Role extends Model
{
    /** @use HasFactory<RoleFactory> */
    use HasFactory;

    protected $fillable = [
        'company',
        'title',
        'period',
        'status',
        'description',
        'is_current',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'description' => 'array',
            'is_current' => 'boolean',
        ];
    }

    #[Scope]
    protected function ordered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }
}
