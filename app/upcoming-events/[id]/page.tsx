import type { Metadata } from "next";
import { Suspense } from "react";
import EventDetails from "@/components/events/EventDetails";
import MoreEvents from "@/components/events/MoreEvents";

export const metadata: Metadata = {
    title: "Event details | Beacon",
};

// the page itself doesn't read the id, so Next.js can pre-build this shell.
// the parts that read the id and fetch data sit inside <Suspense> and load per visit.
export default function EventDetailsPage({ params }: PageProps<"/upcoming-events/[id]">) {
    return (
        <>
            <section className="bg-background py-10
                md:py-14">
                <div className="container-page">
                    <Suspense fallback={
                        <div className="flex flex-col gap-10">
                            <div className="skeleton h-64 md:h-96" />
                            <div className="skeleton h-72" />
                        </div>
                    }>
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
                            {[1, 2, 3].map((item) => <div key={item} className="skeleton h-96" />)}
                        </div>
                    }>
                        <MoreEvents params={params} />
                    </Suspense>
                </div>
            </section>
        </>
    )
}
