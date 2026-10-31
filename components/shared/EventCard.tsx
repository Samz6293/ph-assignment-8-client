import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, ImageIcon, MapPin } from "lucide-react";
import { eventTypes } from "@/lib/eventTypes";
import { Button } from "@/components/ui/button";

// date is already formatted text, e.g. "Mon, 12 Oct 2026"
// without href the button does nothing (used by the live preview)
export default function EventCard({ title, type, location, date, thumbnail, href }:
    { title: string, type: string, location: string, date: string, thumbnail?: string, href?: string }) {
    const eventType = eventTypes.find((item) => item.value === type);

    return (
        <div className="flex flex-col h-full bg-card border border-line rounded-card overflow-hidden">
            {/* thumbnail + type chip */}
            <div className={`relative flex flex-col items-center justify-center gap-2 h-48 ${eventType?.tint || "bg-muted"} text-ink text-xs`}>
                {thumbnail ?
                    // unoptimized: users can paste an image from any website
                    <Image src={thumbnail} alt={title} fill unoptimized className="object-cover" />
                    :
                    <>
                        <ImageIcon className="size-6" /> Event thumbnail
                    </>
                }
                {eventType &&
                    <span className="absolute top-3 left-3 bg-white text-stone-900 px-3 py-1 rounded-full text-xs font-bold">
                        {eventType.label}
                    </span>
                }
            </div>

            {/* title, location, date, button */}
            <div className="flex flex-col flex-1 gap-3 p-4">
                {/* min-h keeps 2 lines of space so all cards match */}
                <h3 className="h-card line-clamp-2 min-h-[2lh]">{title}</h3>
                <div className="flex flex-col gap-1.5 text-muted-foreground text-sm">
                    <p className="flex items-center gap-2"><MapPin className="size-4 shrink-0" /> {location}</p>
                    <p className="flex items-center gap-2"><CalendarDays className="size-4 shrink-0" /> {date}</p>
                </div>

                {/* {href ?
                    <Button size="lg" nativeButton={false} render={<Link href={href} />} className="w-full mt-auto">
                        View Event <ArrowRight />
                    </Button>
                    :
                    <Button type="button" size="lg" className="w-full mt-auto">
                        View Event <ArrowRight />
                    </Button>
                } */}
            </div>
        </div>
    )
}
