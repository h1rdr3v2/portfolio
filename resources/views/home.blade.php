<x-layouts.site footer="signature">
    <section class="flex w-full flex-col gap-5">
        <p class="text-2xl leading-snug font-medium">
            Ndewo <span x-data="wavingHand" @mouseenter="wave()" @mousemove="wave()" role="img" aria-label="waving hand"><span class="waving-hand" :data-waving="waving">👋</span></span>
            I build iOS and Android apps for startups and businesses in <span class="country">{{ config('site.country') }}</span> and beyond, from the first sketch to the App Store and Play Store, backend included.
            <span class="text-muted-foreground">MyCGPA has been live since 2023 with 5,000+ students, and I've built an app for market traders and shipped one for the National Orientation Agency.</span>
        </p>
        <x-site.book-call>Tell me what you're building.</x-site.book-call>
    </section>

    @if ($featured->isNotEmpty())
        <section id="projects" class="mt-2 w-full scroll-mt-6">
            <x-ui.section-heading>Featured</x-ui.section-heading>
            <div class="mt-5 flex flex-col gap-14">
                @foreach ($featured as $project)
                    <x-project.card :project="$project" :eager="$loop->first" />
                @endforeach
            </div>
            <x-site.book-call class="mt-10">Want an app like these?</x-site.book-call>
        </section>
    @endif

    @if ($testimonials->isNotEmpty())
        <section class="w-full">
            <x-ui.section-heading>What clients say</x-ui.section-heading>
            <div class="mt-4 grid gap-2.5 sm:grid-cols-2">
                @foreach ($testimonials as $testimonial)
                    <figure class="flex flex-col justify-between gap-4 rounded-lg bg-card p-5">
                        <blockquote class="text-[15px] leading-relaxed text-foreground/90">“{{ $testimonial->quote }}”</blockquote>
                        <figcaption class="text-sm">
                            @if ($testimonial->url)
                                <a href="{{ $testimonial->url }}" target="_blank" rel="noopener noreferrer" class="font-semibold transition-colors hover:text-accent">{{ $testimonial->author }}</a>
                            @else
                                <span class="font-semibold">{{ $testimonial->author }}</span>
                            @endif
                            @if ($testimonial->author_title)
                                <span class="block text-muted-foreground">{{ $testimonial->author_title }}</span>
                            @endif
                        </figcaption>
                    </figure>
                @endforeach
            </div>
        </section>
    @endif

    @if ($now)
        <section class="w-full">
            <x-ui.section-heading>What I'm working on</x-ui.section-heading>
            {{-- Rendered by the site's own markdown pipeline from the `now` snippet; never reader input. --}}
            <div class="prose prose-post mt-3 w-full max-w-none text-[15.5px] leading-relaxed">{!! $now !!}</div>
        </section>
    @endif

    @if ($projects->isNotEmpty())
        @php
            $labels = ['mobile' => 'Mobile apps', 'website' => 'Websites', 'bot' => 'Bots', 'api' => 'APIs'];
            $groups = collect($labels)->keys()
                ->map(fn ($key) => ['key' => $key, 'label' => $labels[$key], 'count' => $projects->where('category.value', $key)->count()])
                ->filter(fn ($group) => $group['count'] > 0)
                ->values();
            $initial = $groups->first()['key'];
        @endphp
        {{-- Everything that is not featured, as rows, one category at a time. --}}
        <section class="w-full" x-data="{ filter: '{{ $initial }}' }">
            <x-ui.section-heading>
                Everything else
                <x-slot:aside>
                    <div role="radiogroup" aria-label="Filter projects" class="flex flex-wrap gap-1.5">
                        @foreach ($groups as $group)
                            <button type="button" role="radio" @click="filter = '{{ $group['key'] }}'" :aria-checked="filter === '{{ $group['key'] }}'"
                                class="cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
                                :class="filter === '{{ $group['key'] }}' ? 'border-accent bg-accent text-background' : 'border-border text-muted-foreground hover:border-accent hover:text-accent'">
                                {{ $group['label'] }}
                                <span class="ml-1.5 tabular-nums" :class="filter === '{{ $group['key'] }}' ? 'opacity-60' : 'opacity-50'">{{ $group['count'] }}</span>
                            </button>
                        @endforeach
                    </div>
                </x-slot:aside>
            </x-ui.section-heading>

            <div class="mt-4 border-t border-border">
                @foreach ($projects as $project)
                    <div x-show="filter === '{{ $project->category->value }}'" @if ($project->category->value !== $initial) x-cloak @endif>
                        <x-project.row :project="$project" />
                    </div>
                @endforeach
            </div>
        </section>
    @endif

    @if ($posts->isNotEmpty())
        <section id="blog" class="w-full">
            <x-ui.section-heading>
                Blog
                <x-slot:aside>
                    <a href="{{ route('blog.index') }}" class="font-mono text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-accent">
                        All posts{{ $postCount > $posts->count() ? " ({$postCount})" : '' }} →
                    </a>
                </x-slot:aside>
            </x-ui.section-heading>
            <div class="mt-4">
                <x-blog.post-list :posts="$posts" />
            </div>
        </section>
    @endif

    @if ($currentRoles->isNotEmpty() || $formerRoles->isNotEmpty())
        <section class="w-full">
            <x-ui.section-heading>Roles</x-ui.section-heading>

            @if ($currentRoles->isNotEmpty())
                <div class="mt-4 flex flex-col gap-2.5">
                    @foreach ($currentRoles as $role)
                        <div class="rounded-lg bg-card p-4">
                            <h3 class="text-lg font-semibold">
                                {{ $role->company }}
                                @if ($role->title)<span class="ml-2 text-sm font-normal text-muted-foreground">{{ $role->title }}</span>@endif
                                <span class="ml-2 font-mono text-xs font-normal text-muted-foreground">{{ $role->period }}</span>
                            </h3>
                            @foreach ($role->description ?? [] as $line)
                                <p class="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                                    {{-- "schedule a meeting" inside a role's copy becomes the booking link. --}}
                                    @foreach (preg_split('/(schedule a meeting)/i', $line, -1, PREG_SPLIT_DELIM_CAPTURE) as $part)
                                        @if (strcasecmp($part, 'schedule a meeting') === 0)
                                            <a href="{{ config('site.calendar_url') }}" target="_blank" rel="noopener noreferrer" class="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent">{{ $part }}</a>
                                        @else
                                            {{ $part }}
                                        @endif
                                    @endforeach
                                </p>
                            @endforeach
                        </div>
                    @endforeach
                </div>
            @endif

            @if ($formerRoles->isNotEmpty())
                <div class="mt-5 border-t border-border">
                    @foreach ($formerRoles as $role)
                        <div class="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-0.5 border-b border-border py-3">
                            <p class="text-sm font-semibold">
                                {{ $role->company }}
                                @if ($role->title)<span class="ml-2 font-normal text-muted-foreground">{{ $role->title }}</span>@endif
                            </p>
                            <p class="font-mono text-xs whitespace-nowrap text-muted-foreground">{{ $role->period }}</p>
                            @if (! empty($role->description[0]))
                                <p class="col-span-2 text-[13.5px] leading-snug text-muted-foreground/80">{{ $role->description[0] }}</p>
                            @endif
                        </div>
                    @endforeach
                </div>
            @endif
        </section>
    @endif

    @php
        $site = config('site');
        $display = ['x' => 'X/twitter'];
    @endphp
    <section class="mt-6 flex w-full flex-col gap-6">
        <div class="flex flex-col gap-2.5 text-center">
            <h2 class="text-3xl font-bold">Let's Keep in Touch</h2>
            <p class="text-muted-foreground">
                Have an app in mind?
                <a href="{{ $site['calendar_url'] }}" target="_blank" rel="noopener noreferrer" class="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent">Book a call</a>
                and tell me what you're building.
            </p>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 md:gap-x-4">
            @foreach ($site['socials'] as $social)
                <a href="{{ $social['url'] }}" target="_blank" rel="noopener noreferrer" class="transition-colors hover:text-accent">{{ $display[$social['name']] ?? $social['name'] }}</a>
                <span class="h-6 w-px bg-border" aria-hidden="true"></span>
            @endforeach
            <a href="{{ $site['resume_url'] }}" download class="transition-colors hover:text-accent">résumé</a>
        </div>
    </section>
</x-layouts.site>
