import type { Metadata } from "next";
import { Suspense } from "react";
import CreateEventForm from "@/components/events/CreateEventForm";
import CreateEventSkeleton from "@/components/events/CreateEventSkeleton";

export const metadata: Metadata = {
    title: "Create Event | Beacon",
};

export default function CreateEventPage() {
    return (
        <>
            {/* page header */}
            <section className="bg-soft py-12
                md:py-16">
                <div className="container-page flex flex-col gap-3">
                    <p className="eyebrow text-link">Host an event</p>
                    <h1 className="h-page">Create event</h1>
                    <p className="lead text-muted-foreground max-w-2xl">
                        Tell everyone what you are organizing. The card on the right updates as you type.
                    </p>
                </div>
            </section>

            <section className="bg-surface py-12
                md:py-16">
                <div className="container-page">
                    {/* the form reads today's date, so it renders in the browser, not at build time */}
                    <Suspense fallback={<CreateEventSkeleton />}>
                        <CreateEventForm />
                    </Suspense>
                </div>
            </section>
        </>
    )
}
