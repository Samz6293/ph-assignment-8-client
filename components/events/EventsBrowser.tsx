import Link from "next/link";
import { getUpcomingEvents } from "@/lib/fetch";
import { eventTypes } from "@/lib/eventTypes";
import { formatDate } from "@/lib/date";
import { Badge } from "@/components/ui/badge";
import EventCard from "@/components/shared/EventCard";
import NoEvents from "@/components/shared/NoEvents";

export default async function EventsBrowser({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const { type } = await searchParams;
    const allEvents = await getUpcomingEvents();

    const selectedType = eventTypes.find((item) => item.value === type);
    const events = selectedType ? allEvents.filter((event) => event.type === selectedType.value) : allEvents;
    const nothingScheduled = allEvents.length === 0;

    const countLabel = `${events.length} ${selectedType ? selectedType.label.toLowerCase() : "upcoming"} ${events.length === 1 ? "event" : "events"}`;
    const filters = [{ value: "", label: "All" }, ...eventTypes];

    return (
        <div className="flex flex-col gap-8">
            {/* category filters + count */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => {
                        const isActive = (selectedType?.value || "") === filter.value;
                        return (
                            <Badge key={filter.label} variant="outline"
                                render={<Link href={filter.value ? `/upcoming-events?type=${filter.value}` : "/upcoming-events"} />}
                                className={`h-auto px-4 py-2 rounded-full text-sm font-bold
                                ${isActive ? "bg-primary text-on-primary border-primary" : "bg-card text-foreground"}
                                ${nothingScheduled && !isActive && "text-muted-foreground pointer-events-none"}
                                hover:border-primary`}>
                                {filter.label}
                            </Badge>
                        );
                    })}
                </div>
                <p className="text-muted-foreground text-sm">{countLabel}</p>
            </div>

            {/* event grid, or the right empty state */}
            {events.length > 0 ?
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
                :
                <NoEvents category={nothingScheduled ? undefined : selectedType?.label} />
            }
        </div>
    )
}
