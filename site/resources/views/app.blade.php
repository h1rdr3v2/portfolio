@php
    /** @var array<string, mixed> $page */
    $site = config('site');
    $meta = $page['props']['meta'] ?? [];
    $title = $meta['title'] ?? $site['name'].' — '.$site['role'];
    $description = $meta['description'] ?? $site['description'];
    $image = url($meta['image'] ?? $site['og_image']);
    $type = $meta['type'] ?? 'website';
    $canonical = url()->current();
@endphp
<!DOCTYPE html>
<html lang="en" class="antialiased">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>{{ $title }}</title>
    <meta name="description" content="{{ $description }}">
    <meta name="author" content="{{ $site['name'] }}">
    <link rel="canonical" href="{{ $canonical }}">
    <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
    <meta name="theme-color" content="#050311" media="(prefers-color-scheme: dark)">

    <meta property="og:type" content="{{ $type }}">
    <meta property="og:site_name" content="{{ $site['name'] }}">
    <meta property="og:title" content="{{ $title }}">
    <meta property="og:description" content="{{ $description }}">
    <meta property="og:url" content="{{ $canonical }}">
    <meta property="og:locale" content="en_NG">
    <meta property="og:image" content="{{ $image }}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="{{ $site['name'] }}">
    @isset($meta['publishedAt'])
        <meta property="article:published_time" content="{{ $meta['publishedAt'] }}">
    @endisset

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $title }}">
    <meta name="twitter:description" content="{{ $description }}">
    <meta name="twitter:creator" content="{{ '@'.$site['handle'] }}">
    <meta name="twitter:image" content="{{ $image }}">

    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png">
    <link rel="manifest" href="/manifest.json">
    <link rel="alternate" type="application/rss+xml" title="{{ $site['name'] }} — blog" href="{{ route('feed') }}">
    <link rel="sitemap" type="application/xml" href="{{ route('sitemap') }}">

    {{-- Who this site is about, for search engines' knowledge cards. --}}
    <script type="application/ld+json">{!! json_encode([
        '@context' => 'https://schema.org',
        '@type' => 'Person',
        'name' => $site['name'],
        'url' => url('/'),
        'image' => url($site['photo']),
        'jobTitle' => $site['role'],
        'email' => $site['email'],
        'address' => ['@type' => 'PostalAddress', 'addressLocality' => 'Umuahia', 'addressCountry' => 'NG'],
        'sameAs' => collect($site['socials'])->pluck('url')->reject(fn ($url) => str_starts_with($url, 'mailto:'))->values()->all(),
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>

    {{-- Runs before first paint so the page never flashes the wrong theme. --}}
    <script>
        (function () {
            try {
                var stored = localStorage.getItem('theme');
                var theme = stored === 'light' || stored === 'dark'
                    ? stored
                    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.add(theme);
            } catch (e) {}
        })();
    </script>

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    @inertiaHead
</head>
<body class="bg-background text-foreground">
    @inertia
</body>
</html>
