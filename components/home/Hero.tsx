import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import aid from "@/public/aid.jpg";
import cleanup from "@/public/cleanup.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import NextUpCard from "@/components/shared/NextUpCard";

const popularCauses = [
    { label: "Cleanup", value: "cleanup" },
    { label: "Plantation", value: "plantation" },
    { label: "Donation", value: "donation" },
    { label: "Health", value: "health" },
];

export default function Hero() {
    return (
        <section className="bg-soft py-16 overflow-hidden
            md:py-24">
            <div className="container-page grid grid-cols-1 items-center gap-14
                lg:grid-cols-2">

                {/* text side */}
                <div className="flex flex-col items-start gap-6">
                    {/* whitespace-normal lets the text wrap on small phones instead of overflowing */}
                    <Badge variant="outline" className="h-auto max-w-full gap-2 bg-card text-link px-3 py-1.5 font-semibold whitespace-normal">
                        <span className="size-1.5 bg-primary rounded-full" /> Community service events across Bangladesh
                    </Badge>

                    <h1 className="h-hero">
                        Small acts.<br />
                        Lit up together.
                    </h1>

                    <p className="lead text-muted-foreground max-w-xl">
                        Beacon is where neighbors find, host and join social service events, from winter clothes drives
                        to lakeside cleanups.
                    </p>

                    {/* buttons */}
                    <div className="flex flex-wrap gap-3">
                        <Button size="lg" nativeButton={false} render={<Link href="/upcoming-events" />}>
                            Explore events <ArrowRight />
                        </Button>
                        <Button variant="outline" size="lg" nativeButton={false} render={<Link href="/create-event" />}
                            className="bg-transparent border-ink/70
                            dark:bg-transparent dark:border-ink/70">
                            Host an event
                        </Button>
                    </div>

                    {/* popular causes */}
                    <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
                        Popular causes:
                        {popularCauses.map((cause) =>
                            <Badge key={cause.value} variant="outline" render={<Link href={`/upcoming-events?type=${cause.value}`} />}
                                className="h-auto bg-card text-foreground px-3 py-1.5 text-sm
                                hover:border-primary">
                                {cause.label}
                            </Badge>
                        )}
                    </div>
                </div>

                {/* photo collage */}
                <div className="relative h-90
                    sm:h-110">
                    {/* decorative rings behind the photos */}
                    <svg aria-hidden viewBox="0 0 440 440" className="absolute top-1/2 -left-16 size-110 -translate-y-1/2 text-primary opacity-30">
                        {[110, 160, 218].map((radius) =>
                            <circle key={radius} cx="220" cy="220" r={radius} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                        )}
                    </svg>

                    {/* big photo: full width on phones, object-top keeps faces in view */}
                    <Image src={aid} alt="Volunteers handing out winter clothes" placeholder="blur" sizes="(min-width: 1024px) 500px, 90vw" priority
                        className="absolute top-0 right-0 w-full h-[78%] object-cover object-top rounded-hero
                        md:w-[85%] md:h-[80%]" />

                    {/* small photo with a white frame, only from md up */}
                    <Image src={cleanup} alt="Volunteers cleaning up by a lake" placeholder="blur" sizes="240px"
                        className="absolute bottom-0 left-0 hidden w-[45%] h-[42%] object-cover border-4 border-card rounded-card shadow-float
                        md:block" />

                    <NextUpCard className="absolute right-0 bottom-0 left-6
                        sm:left-auto sm:max-w-xs md:right-4 md:bottom-4" />
                </div>
            </div>
        </section>
    )
}
