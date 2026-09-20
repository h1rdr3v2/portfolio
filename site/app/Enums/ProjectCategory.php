<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum ProjectCategory: string implements HasLabel
{
    case Mobile = 'mobile';
    case Website = 'website';
    case Bot = 'bot';
    case Api = 'api';

    public function getLabel(): string
    {
        return match ($this) {
            self::Mobile => 'Mobile app',
            self::Website => 'Website',
            self::Bot => 'Bot',
            self::Api => 'API',
        };
    }
}
