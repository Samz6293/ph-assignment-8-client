import { CalendarDays } from "lucide-react";

// TODO: replace the placeholder text with the next real event once events come from the database
export default function NextUpCard({ className }: { className?: string }) {
    return (
        <div className={`flex flex-col gap-1.5 bg-card text-card-foreground p-5 rounded-card shadow-float ${className}`}>
            <p className="eyebrow text-link text-[11px]">Next up</p>
            <p className="font-heading text-lg font-bold">Winter Clothes Distribution</p>
            <p className="flex items-center gap-2 text-muted-foreground text-sm">
                <CalendarDays className="size-4" /> Sat, 14 Nov 2026 · Mirpur 10
            </p>
        </div>
    )
}
