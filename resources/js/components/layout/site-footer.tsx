import { useSite } from "@/lib/use-site"
import { Signature } from "./signature"

export function SiteFooter() {
	const site = useSite()
	const year = new Date().getFullYear()

	return (
		<footer className="flex w-full flex-col items-center gap-2.5 pt-4">
			<Signature className="h-[95px] w-[160px] text-foreground" />
			<p className="text-center text-xs text-muted-foreground">© {year} {site.name}</p>
		</footer>
	)
}
