import Link from "next/link";
import { CalendarDays, Plus } from "lucide-react";
import { getUpcomingEvents } from "@/lib/fetch";
import { formatDate } from "@/lib/date";

// shows the soonest upcoming event. Wrap it in <Suspense> wherever it's used (it fetches data)
export default async function NextUpCard({ className }: { className?: string }) {
    const events = await getUpcomingEvents(1);
    const nextEvent = events[0];

    // no upcoming events: invite the user to host one instead
    if (!nextEvent) {
        return (
            <Link href="/create-event" className={`flex flex-col gap-1.5 bg-card text-card-foreground p-5 rounded-card shadow-float
                hover:ring-2 hover:ring-primary ${className}`}>
                <p className="eyebrow text-link text-[11px]">Next up</p>
                <p className="font-heading text-lg font-bold">Nothing planned yet</p>
                <p className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Plus className="size-4" /> Be the first to host an event
                </p>
            </Link>
        );
    }

    return (
        <Link href={`/upcoming-events/${nextEvent._id}`} className={`flex flex-col gap-1.5 bg-card text-card-foreground p-5 rounded-card shadow-float
            hover:ring-2 hover:ring-primary ${className}`}>
            <p className="eyebrow text-link text-[11px]">Next up</p>
            <p className="font-heading text-lg font-bold line-clamp-1">{nextEvent.title}</p>
            <p className="flex items-center gap-2 text-muted-foreground text-sm">
                <CalendarDays className="size-4 shrink-0" />
                <span className="line-clamp-1">{formatDate(new Date(nextEvent.date), true)} · {nextEvent.location}</span>
            </p>
        </Link>
    )
}
