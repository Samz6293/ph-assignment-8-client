import { Skeleton } from "@/components/ui/skeleton";

// loading placeholder shaped like the JoinedEvents rows
export default function JoinedEventsSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            {[1, 2, 3].map((item) =>
                <div key={item} className="flex flex-col gap-4 bg-card border border-line p-5 rounded-card
                    sm:flex-row sm:items-center">
                    {/* date tile + thumbnail */}
                    <Skeleton className="w-16 h-14 shrink-0 rounded-xl" />
                    <Skeleton className="w-full h-40 shrink-0 rounded-xl
                        sm:w-28 sm:h-20" />

                    {/* chip, title, location */}
                    <div className="flex flex-col flex-1 gap-2">
                        <Skeleton className="h-4 w-20 rounded-full" />
                        <Skeleton className="h-6 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>

                    <Skeleton className="h-12 w-36 shrink-0 rounded-full" />
                </div>
            )}
        </div>
    )
}
