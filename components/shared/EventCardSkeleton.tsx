import { Skeleton } from "@/components/ui/skeleton";

// loading placeholder shaped like EventCard
export default function EventCardSkeleton() {
    return (
        <div className="flex flex-col h-full bg-card border border-line rounded-card overflow-hidden">
            {/* thumbnail */}
            <Skeleton className="h-48 rounded-none" />

            {/* title, location, date, button */}
            <div className="flex flex-col flex-1 gap-3 p-4">
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-6 w-1/2" />
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-12 w-full mt-auto rounded-full" />
            </div>
        </div>
    )
}
