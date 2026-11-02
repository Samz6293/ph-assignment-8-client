import { getLoggedInUser, getServerToken } from "@/lib/session";
import { getEventByHost, getJoinedEvents } from "@/lib/fetch";
import { formatMonthYear } from "@/lib/date";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileForm from "./ProfileForm";

export default async function ProfileDetails() {

    const user = await getLoggedInUser();
    const token = await getServerToken();
    const joinedEvents = await getJoinedEvents(user.id, token);
    const hostedEvents = await getEventByHost(user.id, token);

    const initials = user.name.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase();

    const stats = [
        { label: "Events joined", value: joinedEvents.length },
        { label: "Events hosted", value: hostedEvents.length },
        { label: "Member since", value: formatMonthYear(new Date(user.createdAt)) },
    ];

    return (
        <div className="grid grid-cols-1 items-start gap-6
            md:grid-cols-[300px_minmax(0,1fr)]">

            <Card>
                <CardContent className="flex flex-col items-center gap-1 text-center">
                    <Avatar className="size-24 mb-3 after:border-[3px] after:border-primary">
                        <AvatarImage src={user.image || undefined} alt={user.name} />
                        <AvatarFallback className="bg-soft text-link font-heading text-3xl font-extrabold">{initials}</AvatarFallback>
                    </Avatar>
                    <p className="h-card">{user.name}</p>
                    <p className="text-muted-foreground text-sm break-all">{user.email}</p>

                    <Separator className="my-4" />

                    <dl className="flex flex-col gap-3 w-full text-sm">
                        {stats.map((stat) =>
                            <div key={stat.label} className="flex justify-between">
                                <dt className="text-muted-foreground">{stat.label}</dt>
                                <dd className="font-bold">{stat.value}</dd>
                            </div>
                        )}
                    </dl>
                </CardContent>
            </Card>

            <ProfileForm user={user} />
        </div>
    )
}
