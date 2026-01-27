"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const messages = [
	"Finding the best offers for you",
	"Matching you with the right loan",
	"Checking eligibility across partners",
	"Almost there, setting things up",
];

function PageContent() {
	const searchParams = useSearchParams();
	const lender = searchParams.get("lender");
	const id = searchParams.get("id");

	const [redirecting, setRedirecting] = useState(false);
	const [messageIndex, setMessageIndex] = useState(0);

	useEffect(() => {
		const redirectTimer = setTimeout(() => {
			setRedirecting(true);
			window.location.href = "https://u40wz.app.link/CredMantra";
		}, 10000);

		const messageTimer = setInterval(() => {
			setMessageIndex((prev) => (prev + 1) % messages.length);
		}, 2000);

		return () => {
			clearTimeout(redirectTimer);
			clearInterval(messageTimer);
		};
	}, []);

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
			<div className="flex flex-col items-center gap-4">
				{lender && <h1 className="text-xl font-semibold">Lender: {lender}</h1>}
				{id && <h1 className="text-xl font-semibold">ID: {id}</h1>}

				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 dark:border-zinc-50" />

				<p className="text-zinc-600 dark:text-zinc-400 text-sm tracking-wide">
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
