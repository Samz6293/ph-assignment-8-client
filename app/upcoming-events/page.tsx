import type { Metadata } from "next";
import { Suspense } from "react";
import EventsBrowser from "@/components/events/EventsBrowser";
import { Skeleton } from "@/components/ui/skeleton";
import EventCardSkeleton from "@/components/shared/EventCardSkeleton";

export const metadata: Metadata = {
    title: "Upcoming Events | Beacon",
};

export default function UpcomingEventsPage({ searchParams }: PageProps<"/upcoming-events">) {
    return (
        <>
            {/* page header */}
            <section className="bg-soft py-12
                md:py-16">
                <div className="container-page flex flex-col gap-3">
                    <h1 className="h-page">Upcoming events</h1>
                    <p className="lead text-muted-foreground max-w-xl">
                        Pick a cause near you and lend a hand.
                    </p>
                </div>
            </section>

            <section className="bg-surface py-12
                md:py-16">
                <div className="container-page">
                    <Suspense fallback={
                        <div className="flex flex-col gap-8">
                            {/* filter chips */}
                            <div className="flex flex-wrap gap-2">
                                {[1, 2, 3, 4, 5, 6].map((item) => <Skeleton key={item} className="h-9 w-24 rounded-full" />)}
                            </div>
                            <div className="grid grid-cols-1 gap-6
                                md:grid-cols-2 lg:grid-cols-3">
                                {[1, 2, 3, 4, 5, 6].map((item) => <EventCardSkeleton key={item} />)}
                            </div>
                        </div>
                    }>
                        <EventsBrowser searchParams={searchParams} />
                    </Suspense>
                </div>
            </section>
        </>
    )
}
