import { getUpcomingEvents } from "@/lib/fetch";
import { formatDate } from "@/lib/date";
import EventCard from "@/components/shared/EventCard";
import NoEvents from "@/components/shared/NoEvents";

export default async function UpcomingEventsList() {
    const events = await getUpcomingEvents(6);

    if (events.length === 0) return <NoEvents />;

    return (
        <div className="grid grid-cols-1 gap-6
            md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) =>
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
    )
}
