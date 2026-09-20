<?php

namespace App\Filament\Resources\Projects\Schemas;

use App\Enums\ProjectCategory;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ProjectForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Project')
                    ->columns(2)
                    ->components([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(120)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (Set $set, ?string $state, ?string $operation): void {
                                if ($operation === 'create') {
                                    $set('slug', Str::slug((string) $state));
                                }
                            }),
                        TextInput::make('slug')
                            ->required()
                            ->maxLength(120)
                            ->unique(ignoreRecord: true),
                        Select::make('category')
                            ->options(ProjectCategory::class)
                            ->required()
                            ->native(false),
                        TextInput::make('year')
                            ->required()
                            ->maxLength(40)
                            ->placeholder('2023 — Present')
                            ->helperText('Free text: "Jun 2026", "2023 — Present", "2024 · Discontinued".'),
                        Textarea::make('description')
                            ->rows(2)
                            ->maxLength(500)
                            ->columnSpanFull()
                            ->helperText('What it is, in one or two lines. Shown under the name and in the list.'),
                        Textarea::make('story')
                            ->required()
                            ->rows(4)
                            ->columnSpanFull()
                            ->helperText('Why it exists, in your own words. Shown in italics as a quote.'),
                        TagsInput::make('tools')
                            ->placeholder('React Native, NestJS…')
                            ->columnSpanFull(),
                    ]),

                Section::make('Screenshots')
                    ->description('Phone shots stand three abreast on the site; a wide shot fills the frame with thumbnails under it. Drag to reorder — the first one leads.')
                    ->components([
                        FileUpload::make('images')
                            ->hiddenLabel()
                            ->image()
                            ->multiple()
                            ->reorderable()
                            ->disk('public')
                            ->directory('projects')
                            ->maxSize(4096)
                            ->maxFiles(8)
                            ->panelLayout('grid'),
                    ]),

                Section::make('Links')
                    ->columns(2)
                    ->collapsible()
                    ->components([
                        TextInput::make('links.appstore')->label('App Store')->url()->maxLength(255),
                        TextInput::make('links.playstore')->label('Play Store')->url()->maxLength(255),
                        TextInput::make('links.website')->label('Website')->url()->maxLength(255),
                        TextInput::make('links.github')->label('GitHub')->url()->maxLength(255),
                        TextInput::make('links.telegram')->label('Telegram')->url()->maxLength(255),
                        TextInput::make('links.whatsapp')->label('WhatsApp')->url()->maxLength(255),
                    ]),

                Section::make('Placement')
                    ->columns(3)
                    ->components([
                        Toggle::make('is_featured')
                            ->label('Featured')
                            ->live()
                            ->helperText('Featured projects open the homepage with their screenshots; everything else is a row further down.'),
                        TextInput::make('featured_order')
                            ->numeric()
                            ->minValue(1)
                            ->visible(fn (Get $get): bool => (bool) $get('is_featured'))
                            ->helperText('1 shows first.'),
                        TextInput::make('sort_order')
                            ->numeric()
                            ->default(0)
                            ->helperText('Order in the list. Drag rows on the index page to change it.'),
                    ]),
            ]);
    }
}
