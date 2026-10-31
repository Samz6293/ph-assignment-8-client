import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ImageIcon, Lock, MapPin, Users } from "lucide-react";
import { getEventDetails } from "@/lib/fetch";
import { eventTypes } from "@/lib/eventTypes";
import { formatLongDate, getDateParts } from "@/lib/date";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// reads the id from the URL and fetches the event, so the page wraps it in <Suspense>
export default async function EventDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const event = await getEventDetails(id);

    // wrong or deleted id: show the 404 page
    if (!event) notFound();

    const eventType = eventTypes.find((item) => item.value === event.type);
    const date = new Date(event.date);
    const { month, day, weekday } = getDateParts(date);
    const hostInitials = event.hostName.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase();

    return (
        <div className="flex flex-col gap-10">
            {/* big thumbnail + type chip */}
            <div className={`relative flex flex-col items-center justify-center gap-2 h-64 ${eventType?.tint || "bg-muted"} text-ink rounded-hero overflow-hidden text-sm
                md:h-96`}>
                {event.thumbnail ?
                    // unoptimized: hosts can paste an image from any website
                    <Image src={event.thumbnail} alt={event.title} fill unoptimized priority className="object-cover" />
                    :
                    <>
                        <ImageIcon className="size-6" /> Event thumbnail
                    </>
                }
                {eventType &&
                    <span className="absolute top-4 left-4 bg-white text-stone-900 px-3 py-1 rounded-full text-xs font-bold">
                        {eventType.label}
                    </span>
                }
            </div>

            <div className="grid grid-cols-1 items-start gap-10
                lg:grid-cols-[minmax(0,1fr)_340px]">

                {/* title, meta, description */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <h1 className="h-page">{event.title}</h1>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground text-sm">
                            <p className="flex items-center gap-2"><MapPin className="size-4" /> {event.location}</p>
                            <p className="flex items-center gap-2"><CalendarDays className="size-4" /> {formatLongDate(date)}</p>
                        </div>
                    </div>

                    <h2 className="h-card text-2xl">About this event</h2>
                    {/* each line break in the description becomes its own paragraph */}
                    <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
                        {event.description.split("\n").filter((line) => line.trim()).map((line, index) =>
                            <p key={index}>{line}</p>
                        )}
                    </div>
                </div>

                {/* join sidebar, sticks to the screen on large screens */}
                <Card className="lg:sticky lg:top-24">
                    <CardContent className="flex flex-col gap-5">
                        {/* date tile */}
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center bg-soft text-link px-4 py-2 rounded-xl">
                                <span className="text-xs font-bold">{month}</span>
                                <span className="font-heading text-2xl font-extrabold leading-none">{day}</span>
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold">{weekday}</p>
                                <p className="text-muted-foreground text-sm">{event.location}</p>
                            </div>
                        </div>

                        <Separator />

                        {/* TODO: show who joined once joining is built */}
                        <p className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Users className="size-4" /> Be the first to join this event
                        </p>

                        <Separator />

                        {/* TODO: make this work (logged-out users go to login first) */}
                        <Button type="button" size="lg" className="w-full">Join Event</Button>

                        <p className="flex gap-2 text-muted-foreground text-xs leading-relaxed">
                            <Lock className="size-3.5 shrink-0 mt-0.5" />
                            <span>
                                Anyone can read this page. You will be asked to <Link href="/login" className="text-link underline">log in</Link> before joining.
                            </span>
                        </p>

                        {/* host */}
                        <div className="flex items-center gap-3 bg-muted p-3 rounded-card">
                            <Avatar className="size-10 after:border-2 after:border-primary">
                                <AvatarFallback className="bg-soft text-link text-sm font-bold">{hostInitials}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className="text-muted-foreground text-xs">Hosted by</p>
                                <p className="text-sm font-bold">{event.hostName}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
