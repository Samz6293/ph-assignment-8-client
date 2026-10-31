import { getUpcomingEvents } from "@/lib/fetch";
import { formatDate } from "@/lib/date";
import EventCard from "@/components/shared/EventCard";

// up to 3 other upcoming events, not the one being viewed
export default async function MoreEvents({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const events = await getUpcomingEvents(4);
    const otherEvents = events.filter((event) => event._id !== id).slice(0, 3);

    // nothing else coming up: hide the section
    if (otherEvents.length === 0) return null;

    return (
        <div className="flex flex-col gap-8">
            <h2 className="h-section">More events coming up</h2>
            <div className="grid grid-cols-1 gap-6
                md:grid-cols-2 lg:grid-cols-3">
                {otherEvents.map((event) =>
                    <EventCard
                        key={event._id}
                        title={event.title}
                        type={event.type}
                        location={event.location}
                        date={formatDate(new Date(event.date), true)}
                        thumbnail={event.thumbnail}
                        href={`/upcoming-events/${event._id}`}
                    />
                )}
            </div>
        </div>
    )
}
