import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

// shown when there are no upcoming events (home section and Upcoming Events page)
export default function NoEvents() {
    return (
        <div className="relative flex flex-col items-center gap-4 bg-card border border-dashed border-line px-6 py-16 rounded-panel text-center overflow-hidden">
            {/* beacon rings: coral in light mode, soft grey in dark mode */}
            <svg aria-hidden viewBox="0 0 400 400" className="absolute top-1/2 left-1/2 size-100 -translate-x-1/2 -translate-y-1/2 text-primary opacity-20
                dark:text-stone-100 dark:opacity-10">
                {[90, 140, 199].map((radius) =>
                    <circle key={radius} cx="200" cy="200" r={radius} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                )}
            </svg>

            <span className="relative flex items-center justify-center size-14 bg-soft text-primary rounded-2xl">
                <CalendarDays className="size-6" />
            </span>
            <h3 className="relative font-heading text-2xl font-extrabold tracking-tight">No upcoming events right now</h3>
            <p className="relative text-muted-foreground max-w-md">
                New events show up here as soon as someone hosts one. Be the first to light one up in your neighborhood.
            </p>
            <Button size="lg" nativeButton={false} render={<Link href="/create-event" />} className="relative mt-2">
                Host an event <ArrowRight />
            </Button>
            <p className="relative text-xs">Past events are hidden automatically.</p>
        </div>
    )
}
