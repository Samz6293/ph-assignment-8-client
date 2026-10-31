import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Page not found | Beacon",
};

export default function NotFound() {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-[70vh] bg-soft py-20 overflow-hidden">
            {/* beacon rings behind everything: coral in light mode, soft grey in dark mode */}
            <svg aria-hidden viewBox="0 0 600 600" className="absolute top-1/2 left-1/2 size-150 -translate-x-1/2 -translate-y-1/2 text-primary opacity-25
                dark:text-stone-100 dark:opacity-10">
                {[90, 150, 210, 270, 299].map((radius) =>
                    <circle key={radius} cx="300" cy="300" r={radius} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                )}
            </svg>

            <div className="container-page relative flex flex-col items-center gap-4 text-center">
                {/* 404, the zero is a beacon ring */}
                <p aria-label="404" className="flex items-center gap-[0.04em] text-ink font-heading text-[110px] font-extrabold leading-none
                    md:text-[150px]">
                    <span aria-hidden>4</span>
                    <span aria-hidden className="flex items-center justify-center size-[0.78em] border-[0.15em] border-primary rounded-full">
                        <span className="size-[0.16em] bg-ink rounded-full" />
                    </span>
                    <span aria-hidden>4</span>
                </p>

                <p className="eyebrow text-link mt-4">Page not found</p>
                <h1 className="h-section">This light went out.</h1>
                <p className="lead text-muted-foreground max-w-md">
                    The page you are looking for moved or never existed. Head back and find an event near you.
                </p>

                {/* buttons */}
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                    <Button size="lg" nativeButton={false} render={<Link href="/" />}>
                        <ArrowRight /> Back to Home
                    </Button>
                    <Button variant="outline" size="lg" nativeButton={false} render={<Link href="/upcoming-events" />}
                        className="bg-transparent border-ink/70
                        dark:bg-transparent dark:border-ink/70">
                        Browse events
                    </Button>
                </div>
            </div>
        </section>
    )
}
