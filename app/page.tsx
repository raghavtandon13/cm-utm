"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { heroRedirectionText } from "@/lib/heroRedirectionText";
import { type LenderKey, utmLinks } from "@/lib/utmLinks";

function PageContent() {
    const searchParams = useSearchParams();

    const phone = searchParams.get("phone") ?? "";
    const rawLender = searchParams.get("lender");

    const links = utmLinks(phone);

    const lender: LenderKey = rawLender && rawLender in links ? (rawLender as LenderKey) : "none";

    const [redirecting, setRedirecting] = useState(false);
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        // fire-and-forget click tracking
        if (phone) {
            fetch("/api/clicks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone, lender, clicked: true }),
            }).catch(() => {});
        }

        const redirectTimer = setTimeout(() => {
            setRedirecting(true);
            window.location.href = links[lender];
        }, 5_000);

        const messageTimer = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % heroRedirectionText.length);
        }, 10_000);

        return () => {
            clearTimeout(redirectTimer);
            clearInterval(messageTimer);
        };
    }, [phone, lender, links]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black">
            {/* <h1 className="text-red-600 mb-10">{links[lender]}</h1> */} {/* DEBUG */}
            <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 animate-spin rounded-full border-zinc-900 border-b-2 dark:border-zinc-50" />
                <p className="text-sm text-zinc-600 tracking-wide dark:text-zinc-400">
                    {redirecting ? "Redirecting…" : heroRedirectionText[messageIndex]}
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
