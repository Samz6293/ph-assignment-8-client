"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { formatMonthYear } from "@/lib/date";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileForm from "./ProfileForm";

export default function ProfileDetails() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    // loading
    if (isPending) return <div className="skeleton h-80" />;

    // TODO: remove once private routes redirect to login
    if (!user) {
        return (
            <Card className="max-w-md mx-auto text-center">
                <CardContent className="flex flex-col items-center gap-4">
                    <p className="text-muted-foreground">Log in to see and edit your profile.</p>
                    <Button size="lg" nativeButton={false} render={<Link href="/login" />}>Login</Button>
                </CardContent>
            </Card>
        );
    }

    const initials = user.name.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase();

    // TODO: replace with real counts once events come from the database
    const stats = [
        { label: "Events joined", value: "0" },
        { label: "Events hosted", value: "0" },
        { label: "Member since", value: formatMonthYear(new Date(user.createdAt)) },
    ];

    return (
        <div className="grid grid-cols-1 items-start gap-6
            md:grid-cols-[300px_minmax(0,1fr)]">

            {/* summary card: shows what is saved, updates after "Save changes" */}
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
