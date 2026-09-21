<?php

namespace App\Services;

use League\CommonMark\Environment\Environment;
use League\CommonMark\Extension\Autolink\AutolinkExtension;
use League\CommonMark\Extension\CommonMark\CommonMarkCoreExtension;
use League\CommonMark\Extension\DisallowedRawHtml\DisallowedRawHtmlExtension;
use League\CommonMark\Extension\ExternalLink\ExternalLinkExtension;
use League\CommonMark\Extension\Strikethrough\StrikethroughExtension;
use League\CommonMark\Extension\Table\TableExtension;
use League\CommonMark\Extension\TaskList\TaskListExtension;
use League\CommonMark\MarkdownConverter;
use Tempest\Highlight\CommonMark\HighlightExtension;

/**
 * Markdown → HTML for posts and snippets. Rendered once on save into a
 * `*_html` column, so a page view never pays for parsing.
 */
class Markdown
{
    private ?MarkdownConverter $converter = null;

    /** Fence names authors reach for that the highlighter knows under another name. */
    private const array FENCE_ALIASES = [
        'tsx' => 'ts',
        'jsx' => 'js',
        'sh' => 'bash',
        'shell' => 'bash',
        'zsh' => 'bash',
        'yml' => 'yaml',
    ];

    public function toHtml(string $markdown): string
    {
        return (string) $this->converter()->convert($this->normalize($markdown));
    }

    /**
     * Words per minute is a reading-speed average; code blocks are skimmed,
     * not read, so they are dropped before counting.
     */
    public function readingMinutes(string $markdown): int
    {
        $prose = preg_replace('/```[\s\S]*?```/', ' ', $markdown) ?? $markdown;
        $words = count(array_filter(preg_split('/\s+/', strip_tags($prose)) ?: []));

        return max(1, (int) round($words / 225));
    }

    private function normalize(string $markdown): string
    {
        $markdown = str_replace("\r\n", "\n", $markdown);

        // A post that opens by repeating its own title as an H1 would give the
        // page two of them — the header already renders it.
        $markdown = preg_replace('/\A\s*#\s+[^\n]+\n+/', '', $markdown) ?? $markdown;

        return preg_replace_callback(
            '/^(`{3,})([a-zA-Z]+)\b/m',
            fn (array $match): string => $match[1].(self::FENCE_ALIASES[strtolower($match[2])] ?? $match[2]),
            $markdown,
        ) ?? $markdown;
    }

    private function converter(): MarkdownConverter
    {
        if ($this->converter !== null) {
            return $this->converter;
        }

        $environment = new Environment([
            'html_input' => 'allow',
            'allow_unsafe_links' => false,
            'external_link' => [
                'internal_hosts' => parse_url((string) config('app.url'), PHP_URL_HOST) ?: [],
                'open_in_new_window' => true,
                'noopener' => 'external',
                'noreferrer' => 'external',
            ],
        ]);

        $environment
            ->addExtension(new CommonMarkCoreExtension)
            ->addExtension(new AutolinkExtension)
            ->addExtension(new StrikethroughExtension)
            ->addExtension(new TableExtension)
            ->addExtension(new TaskListExtension)
            ->addExtension(new DisallowedRawHtmlExtension)
            ->addExtension(new ExternalLinkExtension)
            ->addExtension(new HighlightExtension);

        return $this->converter = new MarkdownConverter($environment);
    }
}
