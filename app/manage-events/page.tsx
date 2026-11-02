import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ManageEvents from "@/components/events/ManageEvents";
import ManageEventsSkeleton from "@/components/events/ManageEventsSkeleton";

export const metadata: Metadata = {
    title: "Manage Events | Beacon",
};

export default function ManageEventsPage() {
    return (
        <section className="bg-surface py-12
            md:py-16">
            <div className="container-page flex flex-col gap-8">
                {/* page header + create button */}
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="h-page">Manage your events</h1>
                        <p className="text-muted-foreground">Events you created. Only you can update or delete them.</p>
                    </div>
                    <Button size="lg" nativeButton={false} render={<Link href="/create-event" />}>
                        <Plus /> Create event
                    </Button>
                </div>

                {/* reads the logged-in user and today's date, so it loads per visit */}
                <Suspense fallback={<ManageEventsSkeleton />}>
                    <ManageEvents />
                </Suspense>
            </div>
        </section>
    )
}
