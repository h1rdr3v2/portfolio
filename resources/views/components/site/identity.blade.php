@php
    $site = config('site');
    $icons = ['github' => 'github', 'linkedin' => 'linkedin', 'x' => 'x', 'mail' => 'mail'];
    $onHome = request()->routeIs('home');
@endphp

{{-- Who this is, at the top of every page — the site's only header. --}}
<header class="flex w-full items-start justify-between gap-4">
    <div class="flex min-w-0 items-center gap-4">
        <a href="{{ route('home') }}" aria-label="Home" class="shrink-0">
            <img src="{{ $site['photo'] }}" alt="{{ $site['name'] }}" width="70" height="70" class="size-[70px] rounded-full object-cover">
        </a>
        <div class="min-w-0">
            <h1 class="text-lg font-medium">
                <a href="{{ route('home') }}" class="transition-colors hover:text-accent">{{ $site['name'] }}</a>
            </h1>
            <p class="-mt-0.5 text-sm font-medium text-muted-foreground">{{ $site['role'] }}</p>
            <div class="mt-2 flex flex-wrap items-center gap-x-3.5 gap-y-1.5">
                <span class="inline-flex items-center gap-1 text-xs whitespace-nowrap text-muted-foreground">
                    <x-ui.icon name="pin" class="size-3.5" />
                    {{ $site['location'] }}
                </span>
                <span class="hidden h-3 w-px bg-border sm:block" aria-hidden="true"></span>
                <ul class="flex items-center gap-3">
                    @foreach ($site['socials'] as $social)
                        @if (isset($icons[$social['name']]))
                            <li>
                                <a href="{{ $social['url'] }}" target="_blank" rel="noopener noreferrer" aria-label="{{ $social['name'] }}" class="block text-muted-foreground transition-colors hover:text-accent">
                                    <x-ui.icon :name="$icons[$social['name']]" class="size-4" />
                                </a>
                            </li>
                        @endif
                    @endforeach
                </ul>
                <span class="hidden h-3 w-px bg-border sm:block" aria-hidden="true"></span>
                @if ($onHome)
                    <a href="{{ route('blog.index') }}" class="text-xs font-medium transition-colors hover:text-accent">Blog →</a>
                @else
                    <a href="{{ route('home') }}" class="text-xs font-medium transition-colors hover:text-accent">← Home</a>
                @endif
            </div>
        </div>
    </div>

    <x-theme.light-switch class="-mt-1 -mr-2 shrink-0" />
</header>
