import { Skeleton } from "@/components/ui/skeleton";
import EventCardSkeleton from "@/components/shared/EventCardSkeleton";

// loading placeholder shaped like CreateEventForm: form card + live preview
export default function CreateEventSkeleton() {
    return (
        <div className="grid grid-cols-1 items-start gap-8
            lg:grid-cols-[minmax(0,1fr)_380px]">

            {/* form card: label + field pairs */}
            <div className="flex flex-col gap-5 bg-card border border-line p-6 rounded-panel
                md:p-8">
                <Skeleton className="h-7 w-40 mb-1" />
                {[1, 2, 3, 4, 5].map((item) =>
                    <div key={item} className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-13 w-full rounded-field" />
                    </div>
                )}
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-28 w-full rounded-field" />
                </div>
                <div className="flex justify-end gap-3">
                    <Skeleton className="h-12 w-28 rounded-full" />
                    <Skeleton className="h-12 w-36 rounded-full" />
                </div>
            </div>

            {/* live preview */}
            <div className="flex flex-col gap-3">
                <Skeleton className="h-4 w-28" />
                <EventCardSkeleton />
            </div>
        </div>
    )
}
