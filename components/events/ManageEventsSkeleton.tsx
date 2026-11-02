import { Skeleton } from "@/components/ui/skeleton";

// loading placeholder shaped like ManageEvents: stat cards + events table
export default function ManageEventsSkeleton() {
    return (
        <div className="flex flex-col gap-6">
            {/* stats */}
            <div className="grid grid-cols-1 gap-4
                md:grid-cols-3">
                {[1, 2, 3].map((item) =>
                    <div key={item} className="flex flex-col gap-3 bg-card border border-line p-5 rounded-card">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-9 w-1/3" />
                    </div>
                )}
            </div>

            {/* table: header + rows */}
            <div className="bg-card border border-line rounded-panel overflow-hidden">
                <div className="bg-soft px-6 py-4">
                    <Skeleton className="h-4 w-1/3" />
                </div>
                {[1, 2, 3, 4].map((item) =>
                    <div key={item} className="flex items-center gap-4 border-t border-line px-6 py-4">
                        <Skeleton className="size-12 shrink-0 rounded-xl" />
                        <div className="flex flex-col flex-1 gap-2">
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-20 rounded-full" />
                        </div>
                        <Skeleton className="hidden h-8 w-40 rounded-full
                            sm:block" />
                    </div>
                )}
            </div>
        </div>
    )
}
