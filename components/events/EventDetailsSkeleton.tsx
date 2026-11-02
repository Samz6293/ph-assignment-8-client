import { Skeleton } from "@/components/ui/skeleton";

// loading placeholder shaped like EventDetails
export default function EventDetailsSkeleton() {
    return (
        <div className="flex flex-col gap-10">
            {/* big thumbnail */}
            <Skeleton className="h-64 rounded-hero
                md:h-96" />

            <div className="grid grid-cols-1 items-start gap-10
                lg:grid-cols-[minmax(0,1fr)_340px]">

                {/* title, meta, description */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <Skeleton className="h-12 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                    <Skeleton className="h-7 w-48" />
                    <div className="flex flex-col gap-3">
                        {["w-full", "w-full", "w-11/12", "w-4/5", "w-2/3"].map((width, index) =>
                            <Skeleton key={index} className={`h-4 ${width}`} />
                        )}
                    </div>
                </div>

                {/* sidebar card */}
                <div className="flex flex-col gap-5 bg-card border border-line p-5 rounded-card">
                    <div className="flex items-center gap-4">
                        <Skeleton className="size-14 rounded-xl" />
                        <div className="flex flex-col flex-1 gap-2">
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-12 w-full rounded-full" />
                    <Skeleton className="h-16 w-full rounded-card" />
                </div>
            </div>
        </div>
    )
}
