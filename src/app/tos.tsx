import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/tos")({
	component: TosPage,
	head: () => ({
		meta: [
			{ title: "Terms of Service — MySales" },
			{
				name: "description",
				content:
					"Terms of Service for MySales — the offline-first profit tracker.",
			},
		],
	}),
})

function TosPage() {
	return (
		<main className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
			<h1 className="text-3xl sm:text-4xl font-bold mb-8">Terms of Service</h1>
			<p className="text-muted-foreground mb-8">Last updated: June 2, 2026</p>

			<section className="space-y-6 text-foreground/80 leading-relaxed">
				<div>
					<h2 className="text-xl font-semibold mb-3 text-foreground">
						1. Acceptance of Terms
					</h2>
					<p>
						By downloading, installing, or using MySales (&ldquo;the
						App&rdquo;), you agree to be bound by these Terms of Service. If you
						do not agree to these terms, please do not use the App.
					</p>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-3 text-foreground">
						2. Description of Service
					</h2>
					<p>
						MySales is an offline-first profit tracking application designed for
						market traders, shop owners, and small business operators. The App
						allows you to record sales, track expenses, calculate profit and
						loss, and manage basic inventory — all stored locally on your
						device. MySales does not provide cloud storage, account
						synchronization, or any server-based features.
					</p>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-3 text-foreground">
						3. User Responsibilities
					</h2>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							You are solely responsible for maintaining the accuracy of the
							data you enter into the App.
						</li>
						<li>
							You are responsible for backing up your own data. MySales does not
							provide cloud backup or data recovery services. If you delete the
							App or lose your device, your data will be irretrievably lost.
						</li>
						<li>
							You agree not to use the App for any unlawful purpose or in
							violation of any applicable laws or regulations.
						</li>
					</ul>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-3 text-foreground">
						4. Intellectual Property
					</h2>
					<p>
						The App, including its name, logo, design, source code, and all
						related materials, is the exclusive intellectual property of Bleon
						LTD. You may not copy, modify, distribute, sell, or create
						derivative works based on the App without prior written consent.
					</p>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-3 text-foreground">
						5. Disclaimer of Warranties
					</h2>
					<p>
						MySales is provided &ldquo;as is&rdquo; and &ldquo;as
						available&rdquo; without warranties of any kind, either express or
						implied. We do not guarantee that the App will be error-free,
						uninterrupted, or that any defects will be corrected. The financial
						calculations provided by the App are for informational purposes only
						and should not be relied upon as professional accounting advice.
					</p>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-3 text-foreground">
						6. Limitation of Liability
					</h2>
					<p>
						To the fullest extent permitted by law, Bleon LTD and its affiliates
						shall not be liable for any indirect, incidental, special,
						consequential, or punitive damages, including but not limited to
						loss of profits, data, or business opportunities, arising from your
						use of or inability to use the App — even if we have been advised of
						the possibility of such damages.
					</p>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-3 text-foreground">
						7. App Store Terms
					</h2>
					<p>
						If you download the App from the Apple App Store or Google Play
						Store, you acknowledge that your use is also subject to the
						respective store&apos;s terms and conditions. Bleon LTD is solely
						responsible for the App and its content, not the app store
						providers.
					</p>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-3 text-foreground">
						8. Modifications to the App
					</h2>
					<p>
						We reserve the right to modify, suspend, or discontinue the App (or
						any part of it) at any time without notice. We may also update these
						Terms from time to time. Continued use of the App after any changes
						constitutes your acceptance of the updated Terms.
					</p>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-3 text-foreground">
						9. Termination
					</h2>
					<p>
						These Terms remain effective until terminated by either party. You
						may terminate at any time by deleting the App from your device. We
						may terminate these Terms if you breach any provision, upon which
						you must cease all use of the App.
					</p>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-3 text-foreground">
						10. Governing Law
					</h2>
					<p>
						These Terms shall be governed by and construed in accordance with
						the laws of the Federal Republic of Nigeria, without regard to its
						conflict of law provisions.
					</p>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-3 text-foreground">
						11. Contact
					</h2>
					<p>
						For questions about these Terms of Service, contact us at{" "}
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
