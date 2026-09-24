<?php

namespace App\Filament\Resources\Testimonials\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class TestimonialForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Testimonial')
                    ->columns(2)
                    ->components([
                        Textarea::make('quote')
                            ->required()
                            ->rows(3)
                            ->maxLength(600)
                            ->columnSpanFull()
                            ->helperText('Their words, as they sent them. Two or three sentences reads best.'),
                        TextInput::make('author')
                            ->required()
                            ->maxLength(120)
                            ->placeholder('Chidinma Onyia'),
                        TextInput::make('author_title')
                            ->label('Role')
                            ->maxLength(120)
                            ->placeholder('Founder, HafrikPlay'),
                        TextInput::make('url')
                            ->label('Link')
                            ->url()
                            ->maxLength(255)
                            ->helperText('Their LinkedIn or site, so a reader can check they are real. Optional.'),
                        TextInput::make('sort_order')
                            ->numeric()
                            ->default(0),
                        Toggle::make('is_published')
                            ->label('Published')
                            ->default(true)
                            ->helperText('Only published testimonials are shown on the homepage.'),
                    ]),
            ]);
    }
}
