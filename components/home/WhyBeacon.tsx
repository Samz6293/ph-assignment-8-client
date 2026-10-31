import { CalendarPlus, CircleCheck, Clock, List } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import SectionHeading from "@/components/shared/SectionHeading";

const features = [
    {
        icon: <CalendarPlus />,
        title: "Host in minutes",
        description: "Add a title, cause, place and date. Your event goes live on the board right away.",
    },
    {
        icon: <CircleCheck />,
        title: "Join with one tap",
        description: "See what is happening near you and save your spot without phone calls or paper forms.",
    },
    {
        icon: <List />,
        title: "Track what you joined",
        description: "Every event you sign up for lands in one tidy list, sorted by date so nothing slips.",
    },
    {
        icon: <Clock />,
        title: "Only what is ahead",
        description: "Past events drop off on their own, so the board always shows causes you can still join.",
    },
];

export default function WhyBeacon() {
    return (
        <section className="bg-background py-16
            md:py-24">
            <div className="container-page flex flex-col gap-12">
                <SectionHeading
                    eyebrow="Why Beacon"
                    title="Built for people who show up"
                    description="Everything a local cause needs to get from an idea to a crowd of helpers on the day."
                />

                {/* feature cards */}
                <div className="grid grid-cols-1 gap-5
                    sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) =>
                        <Card key={feature.title} className="h-full">
                            <CardContent className="flex flex-col gap-3">
                                <span className="flex items-center justify-center size-10 bg-soft text-link rounded-xl [&>svg]:size-5">
                                    {feature.icon}
                                </span>
                                <CardTitle className="h-card mt-2 text-lg">{feature.title}</CardTitle>
                                <CardDescription className="leading-relaxed">{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </section>
    )
}
