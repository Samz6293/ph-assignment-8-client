import Link from "next/link";
import { ArrowRight, CalendarDays, History, Plus } from "lucide-react";
import { getLoggedInUser } from "@/lib/session";
import { getEventByHost } from "@/lib/fetch";
import { formatDayMonth, getToday } from "@/lib/date";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HostedEventsTable from "./HostedEventsTable";

export default async function ManageEvents() {
    const user = await getLoggedInUser();
    const events = await getEventByHost(user.id);
    const today = getToday();

    const upcomingEvents = events.filter((event) => new Date(event.date) >= today);
    const pastEvents = events.filter((event) => new Date(event.date) < today).reverse(); // most recent first
    const nextEvent = upcomingEvents[0];

    // everyone who joined any of this host's events
    const totalJoined = events.reduce((total, event) => total + (event.joinedPeople?.length || 0), 0);

    const stats = [
        { label: "Events you host", value: events.length },
        { label: "Next event", value: nextEvent ? formatDayMonth(new Date(nextEvent.date)) : "None yet" },
        { label: "People joined", value: totalJoined },
    ];

    return (
        <div className="flex flex-col gap-6">
            {/* stats */}
            <div className="grid grid-cols-1 gap-4
                md:grid-cols-3">
                {stats.map((stat) =>
                    <Card key={stat.label}>
                        <CardContent className="flex flex-col gap-2">
                            <p className="text-muted-foreground text-sm">{stat.label}</p>
                            <p className="font-heading text-3xl font-extrabold tracking-tight">{stat.value}</p>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* nothing hosted yet */}
            {events.length === 0 &&
                <div className="bg-card border border-line rounded-panel overflow-hidden">
                    <div className="relative flex flex-col items-center gap-4 px-6 py-16 text-center overflow-hidden">
                        {/* beacon rings: coral in light mode, soft grey in dark mode */}
                        <svg aria-hidden viewBox="0 0 400 400" className="absolute top-1/2 left-1/2 size-125 -translate-x-1/2 -translate-y-1/2 text-primary opacity-20
                            dark:text-stone-100 dark:opacity-10">
                            {[90, 140, 199].map((radius) =>
                                <circle key={radius} cx="200" cy="200" r={radius} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                            )}
                        </svg>

                        <span className="relative flex items-center justify-center size-14 bg-soft text-primary rounded-2xl">
                            <CalendarDays className="size-6" />
                        </span>
                        <h3 className="relative font-heading text-2xl font-extrabold tracking-tight">You have not hosted an event yet</h3>
                        <p className="relative text-muted-foreground max-w-md">
                            Start one for your neighborhood, or see what others are organizing and lend a hand first.
                        </p>
                        <div className="relative flex flex-wrap justify-center gap-3 mt-2">
                            <Button size="lg" nativeButton={false} render={<Link href="/create-event" />}>
                                Host an event <ArrowRight />
                            </Button>
                            <Link href="/upcoming-events" className="btn btn-outline">Check upcoming events</Link>
                        </div>
                    </div>
                </div>
            }

            {/* upcoming: can be updated and deleted */}
            {events.length > 0 &&
                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="h-card text-2xl">Your upcoming events</h2>
                        <p className="text-muted-foreground text-sm">Still ahead. You can update the details or delete them.</p>
                    </div>
                    {upcomingEvents.length > 0 ?
                        <HostedEventsTable events={upcomingEvents} />
                        :
                        <Card>
                            <CardContent className="flex flex-wrap items-center justify-between gap-4">
                                <p className="text-muted-foreground">Nothing coming up. Your next event will show here.</p>
                                <Button size="lg" nativeButton={false} render={<Link href="/create-event" />}>
                                    <Plus /> Host an event
                                </Button>
                            </CardContent>
                        </Card>
                    }
                </div>
            }

            {/* past: can only be deleted */}
            {pastEvents.length > 0 &&
                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="flex items-center gap-2 h-card text-2xl">
                            <History className="size-5 text-muted-foreground" /> Past events
                        </h2>
                        <p className="text-muted-foreground text-sm">Already happened. They are hidden from the board and can only be deleted.</p>
                    </div>
                    <HostedEventsTable events={pastEvents} isPast />
                </div>
            }
        </div>
    )
}
