import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import UpcomingEventsList from "./UpcomingEventsList";

export default function UpcomingEvents() {
    return (
        <section className="bg-surface py-16
            md:py-24">
            <div className="container-page flex flex-col gap-10">
                {/* heading + see all link */}
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <SectionHeading left eyebrow="Happening soon" title="Upcoming events" />
                    <Link href="/upcoming-events" className="flex items-center gap-2 text-link text-sm font-bold
                        hover:underline">
                        See all events <ArrowRight className="size-4" />
                    </Link>
                </div>

                {/* skeleton cards while the events load */}
                <Suspense fallback={
                    <div className="grid grid-cols-1 gap-6
                        md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((item) => <div key={item} className="skeleton h-96" />)}
                    </div>
                }>
                    <UpcomingEventsList />
                </Suspense>
            </div>
        </section>
    )
}
