import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/privacy")({
	component: PrivacyPage,
	head: () => ({
		meta: [
			{ title: "Privacy Policy — MySales" },
			{
				name: "description",
				content:
					"Privacy Policy for MySales — the offline-first profit tracker.",
			},
		],
	}),
})

function PrivacyPage() {
	return (
		<main className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
			<h1 className="text-3xl sm:text-4xl font-bold mb-8">Privacy Policy</h1>
			<p className="text-muted-foreground mb-8">Last updated: June 2, 2026</p>

			<section className="space-y-6 text-foreground/80 leading-relaxed">
				<div>
					<h2 className="text-xl font-semibold mb-3 text-foreground">
						Our Stance on Privacy
					</h2>
					<p>
						MySales is built with a simple belief:{" "}
						<strong>your sales data belongs to you, and only you</strong>. We
						designed MySales to be completely offline-first — all your data
						stays on your device and never touches our servers because there are
						no servers to touch.
					</p>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-3 text-foreground">
						Data We Collect
					</h2>
					<p className="font-medium">Nothing. Zero. Zilch.</p>
					<p>
						MySales does not collect, store, or transmit any personal
						information. We don&apos;t ask for your name, email address, phone
						number, or location. We don&apos;t use analytics SDKs, crash
						reporters, or tracking frameworks. There is no account creation, no
						sign-in, and no cloud sync.
					</p>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-3 text-foreground">
						Data Stored On Your Device
					</h2>
					<p>
						All sales records, profit calculations, inventory entries, and
						settings are stored
						<strong> exclusively on your device</strong> using local storage.
						This data never leaves your phone. If you delete the app, all your
						data is permanently deleted along with it. If you uninstall and
						reinstall, you start fresh — because there&apos;s no cloud backup to
						restore from.
					</p>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-3 text-foreground">
						Third-Party Services
					</h2>
					<p>
						MySales does not integrate with any third-party analytics,
						advertising, or tracking services. We don&apos;t use Google
						Analytics, Firebase, Facebook SDK, or any other third-party library
						that could compromise your privacy.
					</p>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-3 text-foreground">
						Children&apos;s Privacy
					</h2>
					<p>
						MySales is not directed at children under the age of 13. Since we
						don&apos;t collect any data from anyone, we couldn&apos;t collect
						data from children even if we tried.
					</p>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-3 text-foreground">
						Changes to This Policy
					</h2>
					<p>
						If we ever update this privacy policy, we&apos;ll notify users
						through an in-app notice. But rest assured — our commitment to
						keeping your data on your device will never change. That&apos;s the
						whole point of MySales.
					</p>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-3 text-foreground">
						Contact
					</h2>
					<p>
						If you have any questions about this privacy policy, reach out to us
						at{" "}
						<a
							href="mailto:support@bleon.co"
							className="underline text-primary hover:text-primary/80"
						>
							support@bleon.co
						</a>
						.
					</p>
				</div>
			</section>
		</main>
	)
}
