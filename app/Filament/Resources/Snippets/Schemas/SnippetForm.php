<?php

namespace App\Filament\Resources\Snippets\Schemas;

use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class SnippetForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('key')
                    ->required()
                    ->maxLength(40)
                    ->alphaDash()
                    ->unique(ignoreRecord: true)
                    ->disabledOn('edit')
                    ->dehydrated()
                    ->helperText('Where on the site this shows. "now" is the "What I\'m working on" section on the homepage.'),
                TextInput::make('title')
                    ->maxLength(120),
                MarkdownEditor::make('body')
                    ->required()
                    ->columnSpanFull()
                    ->toolbarButtons(['bold', 'italic', 'link', 'bulletList', 'orderedList', 'undo', 'redo']),
            ]);
    }
}
