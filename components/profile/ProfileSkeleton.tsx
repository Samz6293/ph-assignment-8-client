import { Skeleton } from "@/components/ui/skeleton";

// loading placeholder shaped like ProfileDetails: summary card + form card
export default function ProfileSkeleton() {
    return (
        <div className="grid grid-cols-1 items-start gap-6
            md:grid-cols-[300px_minmax(0,1fr)]">

            {/* summary card */}
            <div className="flex flex-col items-center gap-3 bg-card border border-line p-5 rounded-card">
                <Skeleton className="size-24 rounded-full" />
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex flex-col gap-3 w-full border-t border-line mt-2 pt-4">
                    {[1, 2, 3].map((item) =>
                        <div key={item} className="flex justify-between">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-12" />
                        </div>
                    )}
                </div>
            </div>

            {/* form card */}
            <div className="flex flex-col gap-5 bg-card border border-line p-5 rounded-card">
                <Skeleton className="h-7 w-48" />
                {[1, 2].map((item) =>
                    <div key={item} className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-13 w-full rounded-field" />
                    </div>
                )}
                <div className="flex justify-end gap-3">
                    <Skeleton className="h-12 w-28 rounded-full" />
                    <Skeleton className="h-12 w-36 rounded-full" />
                </div>
            </div>
        </div>
    )
}
