import { useMemo } from "react"
import { getHeroStats } from "@/lib/stats"
import { StatList } from "@/components/ui/stat"
import { SectionLink } from "@/components/ui/section-link"
import { UliRule } from "@/components/ui/uli-rule"

export function HeroSection() {
	// Derived from the project list, so "years shipping" stays right without
	// anyone editing a number each January.
	const stats = useMemo(() => getHeroStats(), [])

	return (
		<>
			<section
				id="top"
				data-scroll-target
				className="max-w-[1180px] px-5 pt-16 pb-16 md:px-12 lg:px-[72px] lg:pt-33 lg:pb-21"
			>
				<p className="eyebrow text-accent">
					Mobile developer · Igbo · Umuahia · since 2017
				</p>

				<p className="mt-4 font-serif text-5xl leading-[0.95] font-normal tracking-tight md:text-[5.5rem]">
					Ndewo <span className="text-[0.62em]">👋</span>
				</p>

				<h1 className="mt-5 max-w-[20ch] font-serif text-[2.5rem] leading-tight font-normal tracking-tight md:text-display">
					I build for the market I live in.
				</h1>

				<p className="mt-6 max-w-[62ch] text-lg leading-relaxed font-light text-mute md:text-xl">
					Nine years of shipping — React Native, Expo and TypeScript — built from
					Umuahia for the market I live in: low-end Android, patchy data, offline by
					necessity, naira shown as naira. Below: three apps you can look at, not
					read about.
				</p>

				<StatList metrics={stats} size="lg" className="mt-11 gap-x-11" />

				<p className="mt-14 font-mono text-xs text-faint">
					<SectionLink to="work" className="hover:text-ink">
						↓ scroll — the screens stay put
					</SectionLink>
				</p>
			</section>

			<UliRule caption="uli — Igbo line drawing, used here as the section rule" />
		</>
	)
}
