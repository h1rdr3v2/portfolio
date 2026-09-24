<?php

namespace App\Filament\Resources\Projects\Schemas;

use App\Enums\ProjectCategory;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
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
                            ->rows(4)
                            ->columnSpanFull()
                            ->helperText('Optional. Why it exists, in your own words, shown under the description.'),
                        TagsInput::make('tools')
                            ->placeholder('React Native, NestJS…')
                            ->columnSpanFull(),
                    ]),

                Section::make('Case study')
                    ->description('What the client needed and what they got. Leave it all empty and the project shows only its story.')
                    ->columns(2)
                    ->collapsible()
                    ->components([
                        Textarea::make('problem')
                            ->rows(3)
                            ->maxLength(600)
                            ->helperText('The situation before: who needed it and what was in the way.'),
                        Textarea::make('outcome')
                            ->label('Result')
                            ->rows(3)
                            ->maxLength(600)
                            ->helperText('What changed once it shipped. Real numbers beat adjectives.'),
                        Repeater::make('metrics')
                            ->label('Numbers')
                            ->schema([
                                TextInput::make('value')->required()->maxLength(20)->placeholder('12k'),
                                TextInput::make('label')->required()->maxLength(60)->placeholder('downloads'),
                            ])
                            ->columns(2)
                            ->maxItems(4)
                            ->reorderable()
                            ->addActionLabel('Add number')
                            ->columnSpanFull()
                            ->helperText('Up to four, shown large on the featured card. Only numbers you can back up.'),
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
