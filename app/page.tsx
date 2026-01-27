"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const messages = [
	"Finding the best offers for you",
	"Matching you with the right loan",
	"Checking eligibility across partners",
	"Almost there, setting things up",
];

function PageContent() {
	const searchParams = useSearchParams();
	const lender = searchParams.get("lender");
	const phone = searchParams.get("phone");

	const [redirecting, setRedirecting] = useState(false);
	const [messageIndex, setMessageIndex] = useState(0);

	useEffect(() => {
		// ✅ fire-and-forget click tracking
		if (phone && lender) {
			fetch("/api/clicks", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ phone, lender, clicked: true }),
			}).catch(() => {});
		}

		const redirectTimer = setTimeout(() => {
			setRedirecting(true);
			window.location.href = "https://u40wz.app.link/CredMantra";
		}, 10_000);

		const messageTimer = setInterval(() => {
			setMessageIndex((prev) => (prev + 1) % messages.length);
		}, 2_000);

		return () => {
			clearTimeout(redirectTimer);
			clearInterval(messageTimer);
		};
	}, [phone, lender]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
			<div className="flex flex-col items-center gap-4">
				<div className="h-12 w-12 animate-spin rounded-full border-b-2 border-zinc-900 dark:border-zinc-50" />
				<p className="text-sm tracking-wide text-zinc-600 dark:text-zinc-400">
					{redirecting ? "Redirecting…" : messages[messageIndex]}
				</p>
			</div>
		</div>
	);
}

export default function Page() {
	return (
		<Suspense fallback={null}>
			<PageContent />
		</Suspense>
	);
}
