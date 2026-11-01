import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { ArrowRight, CalendarCheck, MapPin } from "lucide-react";
import { auth } from "@/lib/auth";
import { getJoinedEvents } from "@/lib/fetch";
import { eventTypes } from "@/lib/eventTypes";
import { getDateParts, getToday } from "@/lib/date";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LeaveEventButton from "./LeaveEventButton";

// reads the logged-in user and fetches their joined events, so the page wraps it in <Suspense>
export default async function JoinedEvents() {
    const session = await auth.api.getSession({ headers: await headers() });

    const userId = session?.user.id as string;
    const events = await getJoinedEvents(userId);
    const today = getToday();

    // nothing joined yet
    if (events.length === 0) {
        return (
            <Card className="max-w-xl mx-auto text-center">
                <CardContent className="flex flex-col items-center gap-4 py-6">
                    <span className="flex items-center justify-center size-14 bg-soft text-primary rounded-2xl">
                        <CalendarCheck className="size-6" />
                    </span>
                    <h2 className="font-heading text-2xl font-extrabold tracking-tight">You have not joined any events yet</h2>
                    <p className="text-muted-foreground max-w-md">Find a cause near you and join with one tap. It will show up here.</p>
                    <Button size="lg" nativeButton={false} render={<Link href="/upcoming-events" />}>
                        Browse upcoming events <ArrowRight />
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <p className="text-muted-foreground text-sm">{events.length} {events.length === 1 ? "event" : "events"}, sorted by date</p>

            {events.map((event) => {
                const eventType = eventTypes.find((item) => item.value === event.type);
                const date = new Date(event.date);
                const { month, day, weekday } = getDateParts(date);
                const isPast = date < today;

                return (
                    <Card key={event._id} className={`${isPast && "opacity-70"}`}>
                        <CardContent className="flex flex-col gap-4
                            sm:flex-row sm:items-center">
                            {/* date tile */}
                            <div className="flex flex-col items-center justify-center shrink-0 w-16 bg-soft text-link py-2 rounded-xl">
                                <span className="text-xs font-bold">{month}</span>
                                <span className="font-heading text-2xl font-extrabold leading-none">{day}</span>
                            </div>

                            {/* thumbnail */}
                            <div className={`relative shrink-0 w-full h-40 ${eventType?.tint || "bg-muted"} rounded-xl overflow-hidden
                                sm:w-28 sm:h-20`}>
                                {event.thumbnail &&
                                    // unoptimized: hosts can paste an image from any website
                                    <Image src={event.thumbnail} alt={event.title} fill unoptimized className="object-cover" />
                                }
                            </div>

                            {/* title, location, type */}
                            <div className="flex flex-col flex-1 gap-1.5 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    {eventType && <span className="bg-muted px-2 py-0.5 rounded-full text-xs font-bold">{eventType.label}</span>}
                                    {isPast && <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-xs font-bold">Ended</span>}
                                </div>
                                <h2 className="h-card line-clamp-1">{event.title}</h2>
                                <p className="flex items-center gap-2 text-muted-foreground text-sm">
                                    <MapPin className="size-4 shrink-0" /> <span className="line-clamp-1">{weekday} · {event.location}</span>
                                </p>
                            </div>

                            {/* buttons: past events can't be left */}
                            <div className="flex flex-wrap gap-2 shrink-0">
                                <Button size="lg" nativeButton={false} render={<Link href={`/upcoming-events/${event._id}`} />}>
                                    View Event <ArrowRight />
                                </Button>
                                {!isPast && <LeaveEventButton eventId={event._id} userId={userId} title={event.title} />}
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    )
}
