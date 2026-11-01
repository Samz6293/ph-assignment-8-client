import type { Metadata } from "next";
import { Suspense } from "react";
import EventsBrowser from "@/components/events/EventsBrowser";

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
                            <div className="skeleton h-10 max-w-xl" />
                            <div className="grid grid-cols-1 gap-6
                                md:grid-cols-2 lg:grid-cols-3">
                                {[1, 2, 3, 4, 5, 6].map((item) => <div key={item} className="skeleton h-96" />)}
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
