<?php

namespace App\Filament\Resources\Roles\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;

class RoleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Role')
                    ->columns(2)
                    ->components([
                        TextInput::make('company')
                            ->required()
                            ->maxLength(120),
                        TextInput::make('title')
                            ->maxLength(120)
                            ->placeholder('Founder'),
                        TextInput::make('period')
                            ->required()
                            ->maxLength(40)
                            ->placeholder('2023 — now'),
                        Toggle::make('is_current')
                            ->label('Current role')
                            ->live()
                            ->inline(false)
                            ->helperText('Current roles get a card; former roles a row under "Former roles".'),
                        TextInput::make('status')
                            ->maxLength(60)
                            ->placeholder('Open for Collaboration')
                            ->visible(fn (Get $get): bool => (bool) $get('is_current'))
                            ->helperText('Shown as the green pill on the card. Leave empty for none.'),
                        TextInput::make('sort_order')
                            ->numeric()
                            ->default(0),
                        Repeater::make('description')
                            ->label('Paragraphs')
                            ->simple(Textarea::make('paragraph')->rows(2)->required())
                            ->addActionLabel('Add paragraph')
                            ->reorderable()
                            ->columnSpanFull()
                            ->helperText('Current roles show every paragraph; former roles show the first as a one-line summary. "schedule a meeting" becomes the booking link automatically.'),
                    ]),
            ]);
    }
}
