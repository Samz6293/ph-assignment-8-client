import type { Metadata } from "next";
import { Suspense } from "react";
import EventDetails from "@/components/events/EventDetails";
import MoreEvents from "@/components/events/MoreEvents";
import EventDetailsSkeleton from "@/components/events/EventDetailsSkeleton";
import EventCardSkeleton from "@/components/shared/EventCardSkeleton";

export const metadata: Metadata = {
    title: "Event details | Beacon",
};

export default function EventDetailsPage({ params }: PageProps<"/upcoming-events/[id]">) {
    return (
        <>
            <section className="bg-background py-10
                md:py-14">
                <div className="container-page">
                    <Suspense fallback={<EventDetailsSkeleton />}>
                        <EventDetails params={params} />
                    </Suspense>
                </div>
            </section>

            <section className="bg-surface py-16
                md:py-20">
                <div className="container-page">
                    <Suspense fallback={
                        <div className="grid grid-cols-1 gap-6
                            md:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3].map((item) => <EventCardSkeleton key={item} />)}
                        </div>
                    }>
                        <MoreEvents params={params} />
                    </Suspense>
                </div>
            </section>
        </>
    )
}
