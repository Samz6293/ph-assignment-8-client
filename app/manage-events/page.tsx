import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ManageEvents from "@/components/events/ManageEvents";

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
                <Suspense fallback={
                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 gap-4
                            md:grid-cols-3">
                            {[1, 2, 3].map((item) => <div key={item} className="skeleton h-28" />)}
                        </div>
                        <div className="skeleton h-96" />
                    </div>
                }>
                    <ManageEvents />
                </Suspense>
            </div>
        </section>
    )
}
