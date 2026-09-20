<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>

<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>{{ $site['name'] }}</title>
        <link>{{ url('/blog') }}</link>
        <atom:link href="{{ route('feed') }}" rel="self" type="application/rss+xml" />
        <description>{{ $site['description'] }}</description>
        <language>en</language>
        @foreach ($posts as $post)
            <item>
                <title>{{ $post->title }}</title>
                <link>{{ route('blog.show', $post->slug) }}</link>
                <guid isPermaLink="true">{{ route('blog.show', $post->slug) }}</guid>
                <pubDate>{{ $post->published_at->toRssString() }}</pubDate>
                @if ($post->excerpt)
                    <description>{{ $post->excerpt }}</description>
                @endif
            </item>
        @endforeach
    </channel>
</rss>
