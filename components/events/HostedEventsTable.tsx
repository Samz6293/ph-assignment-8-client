import Image from "next/image";
import Link from "next/link";
import { EventData } from "@/app/types";
import { eventTypes } from "@/lib/eventTypes";
import { formatDate } from "@/lib/date";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DeleteEventButton from "./DeleteEventButton";
import UpdateEventButton from "./UpdateEventButton";

export default function HostedEventsTable({ events, isPast }: { events: EventData[], isPast?: boolean }) {
    const columns = ["Event", "Date", "Location", "Joined", "Actions"];

    return (
        <div className="bg-card border border-line rounded-panel overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-soft border-line hover:bg-soft">
                        {columns.map((column) =>
                            <TableHead key={column} className={`h-12 text-ink px-6 text-xs font-bold tracking-wider uppercase
                                ${column === "Actions" && "text-right"}`}>
                                {column}
                            </TableHead>
                        )}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {events.map((event) => {
                        const eventType = eventTypes.find((item) => item.value === event.type);

                        return (
                            <TableRow key={event._id} className="border-line">
                                {/* thumbnail, title, type */}
                                <TableCell className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`relative shrink-0 size-12 ${eventType?.tint || "bg-muted"} rounded-xl overflow-hidden
                                            ${isPast && "opacity-60"}`}>
                                            {event.thumbnail &&
                                                // unoptimized: hosts can paste an image from any website
                                                <Image src={event.thumbnail} alt={event.title} fill unoptimized className="object-cover" />
                                            }
                                        </div>
                                        <div className="flex flex-col items-start gap-1">
                                            <Link href={`/upcoming-events/${event._id}`} className="font-bold
                                                hover:underline">
                                                {event.title}
                                            </Link>
                                            {eventType &&
                                                <span className="bg-muted px-2 py-0.5 rounded-full text-xs font-bold">{eventType.label}</span>
                                            }
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell className={`px-6 ${isPast && "text-muted-foreground"}`}>{formatDate(new Date(event.date), true)}</TableCell>
                                <TableCell className="px-6">{event.location}</TableCell>
                                {/* TODO: show the real count once joining is built */}
                                <TableCell className="px-6">0</TableCell>

                                {/* actions: past events only get Delete */}
                                <TableCell className="px-6">
                                    <div className="flex items-center justify-end gap-2">
                                        {!isPast && <UpdateEventButton event={event} />}
                                        <DeleteEventButton id={event._id} title={event.title} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    )
}
