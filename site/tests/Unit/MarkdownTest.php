<?php

namespace Tests\Unit;

use App\Services\Markdown;
use Tests\TestCase;

class MarkdownTest extends TestCase
{
    public function test_a_leading_h1_is_dropped(): void
    {
        $html = app(Markdown::class)->toHtml("# Title\n\nBody.");

        $this->assertSame("<p>Body.</p>\n", $html);
    }

    public function test_fence_aliases_reach_the_highlighter(): void
    {
        $html = app(Markdown::class)->toHtml("```tsx\nconst a = 1\n```");

        $this->assertStringContainsString('data-lang="ts"', $html);
        $this->assertStringContainsString('hl-keyword', $html);
    }

    public function test_raw_html_is_escaped_and_external_links_get_rel(): void
    {
        $html = app(Markdown::class)->toHtml("<script>alert(1)</script>\n\n[x](https://example.com)");

        $this->assertStringNotContainsString('<script>', $html);
        $this->assertStringContainsString('rel="noopener noreferrer"', $html);
    }

    public function test_reading_time_ignores_code_and_never_reports_zero(): void
    {
        $markdown = app(Markdown::class);

        $this->assertSame(1, $markdown->readingMinutes('short'));
        $this->assertSame(2, $markdown->readingMinutes(str_repeat('word ', 400)."```\n".str_repeat('code ', 900)."\n```"));
    }
}
