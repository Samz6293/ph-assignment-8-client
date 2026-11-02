import type { Metadata } from "next";
import { Suspense } from "react";
import JoinedEvents from "@/components/events/JoinedEvents";
import JoinedEventsSkeleton from "@/components/events/JoinedEventsSkeleton";

export const metadata: Metadata = {
    title: "Joined Events | Beacon",
};

export default function JoinedEventsPage() {
    return (
        <>
            {/* page header */}
            <section className="bg-soft py-12
                md:py-16">
                <div className="container-page flex flex-col gap-3">
                    <p className="eyebrow text-link">Your plans</p>
                    <h1 className="h-page">Joined events</h1>
                    <p className="lead text-muted-foreground max-w-2xl">Every event you signed up for, in date order so nothing slips.</p>
                </div>
            </section>

            <section className="bg-surface py-12
                md:py-16">
                <div className="container-page max-w-5xl">
                    <Suspense fallback={<JoinedEventsSkeleton />}>
                        <JoinedEvents />
                    </Suspense>
                </div>
            </section>
        </>
    )
}
