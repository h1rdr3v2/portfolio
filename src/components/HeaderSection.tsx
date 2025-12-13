import Link from "next/link"
import { MapPinned } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/ModeToggle"

const HeaderSection = () => {
	return (
		<header className="w-full flex flex-row justify-between p-3 md:p-5 md:fixed md:z-20">
			<nav className="flex flex-row items-center justify-between w-full">
				<div className="flex flex-row gap-2 items-center">
					<Link
						className="text-lg font-black duration-300 motion-reduce:transition-none "
						href="/"
					>
						DE.
					</Link>
				</div>
				<div className="flex flex-row gap-2.5 items-center">
					<Link
						href="/blog"
						className="text-sm font-medium hover:underline transition-all"
					>
						Blog
					</Link>
					<Badge className="text-xs bg-secondary text-secondary-foreground">
						<MapPinned height={12} width={12} className="mr-1" />
						Nigeria
					</Badge>
					<ModeToggle />
				</div>
			</nav>
		</header>
	)
}

export default HeaderSection
