import { useSite } from "@/lib/use-site"
import { WavingHand } from "@/components/ui/waving-hand"

/** The first site's opening line, kept word for word. */
export function AboutSection() {
	const site = useSite()

	return (
		<section className="w-full">
			<p className="text-2xl leading-snug font-medium">
				Ndewo <WavingHand /> — I'm a software engineer and a mobile app developer based in{" "}
				<span className="country">{site.country}</span>, passionate about making things simple and
				automating daily tasks.{" "}
				<span className="text-muted-foreground">
					My focus is on trying to keep up with security and best practices and always looking for
					new things to learn.
				</span>
			</p>
		</section>
	)
}
