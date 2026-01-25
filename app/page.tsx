"use client";
import { useEffect, useState } from "react";

const messages = [
	"Finding the best offers for you",
	"Matching you with the right loan",
	"Checking eligibility across partners",
	"Crunching numbers so you don’t have to",
	"Almost there, setting things up",
];

export default function Home() {
	const [redirecting, setRedirecting] = useState(false);
	const [messageIndex, setMessageIndex] = useState(0);

	useEffect(() => {
		const redirectTimer = setTimeout(() => {
			setRedirecting(true);
			window.location.href =
				"https://www.bbc.com/hindi/india/2015/06/150603_dictatorial_prime_minister_modi_tk";
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
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<div className="flex flex-col items-center gap-4">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 dark:border-zinc-50" />
				<p className="text-zinc-600 dark:text-zinc-400 text-sm tracking-wide transition-all duration-300">
					{redirecting ? "Redirecting…" : messages[messageIndex]}
				</p>
			</div>
		</div>
	);
}
