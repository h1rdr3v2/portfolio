<?php

namespace App\Filament\Resources\Posts\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Post')
                    ->columns(2)
                    ->components([
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (Set $set, ?string $state, ?string $operation): void {
                                if ($operation === 'create') {
                                    $set('slug', Str::slug((string) $state));
                                }
                            }),
                        TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->helperText('The URL: /blog/<slug>. Changing it after publishing breaks shared links.'),
                        Textarea::make('excerpt')
                            ->rows(2)
                            ->maxLength(500)
                            ->columnSpanFull()
                            ->helperText('One or two sentences, shown in lists and as the social-preview description.'),
                        MarkdownEditor::make('body')
                            ->required()
                            ->columnSpanFull()
                            ->fileAttachmentsDisk('public')
                            ->fileAttachmentsDirectory('posts')
                            ->helperText('Markdown. Code fences are highlighted; a leading "# Title" is dropped because the page already shows the title.'),
                    ]),

                Section::make('Publishing')
                    ->columns(2)
                    ->components([
                        DateTimePicker::make('published_at')
                            ->label('Publish at')
                            ->seconds(false)
                            ->helperText('Leave empty to keep it as a draft. A future date schedules it.'),
                        TagsInput::make('tags')
                            ->placeholder('Add a tag'),
                        FileUpload::make('cover_image')
                            ->image()
                            ->disk('public')
                            ->directory('posts')
                            ->imageEditor()
                            ->maxSize(4096)
                            ->columnSpanFull()
                            ->helperText('Optional. Shown at the top of the post and used as the social-preview image.'),
                    ]),
            ]);
    }
}
