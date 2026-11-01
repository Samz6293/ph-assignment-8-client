"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { JoinedPerson } from "@/app/types";
import { joinEvent } from "@/lib/fetch";
import { Button } from "@/components/ui/button";
import LeaveEventButton from "./LeaveEventButton";

export default function JoinEventButton({ eventId, eventTitle, status, user }:
    { eventId: string, eventTitle: string, status: "host" | "loggedOut" | "joined" | "ended" | "canJoin", user?: Omit<JoinedPerson, "joinedAt"> }) {
    const router = useRouter();
    const [joining, setJoining] = useState(false);

    const handleJoin = async () => {
        if (!user) return;
        setJoining(true);
        const success = await joinEvent(eventId, user);
        setJoining(false);

        if (success) router.refresh();
    }

    if (status === "host") {
        return (
            <Button size="lg" nativeButton={false} render={<Link href="/manage-events" />} className="w-full">
                Manage your event <ArrowRight />
            </Button>
        );
    }

    if (status === "loggedOut") {
        return (
            <Button size="lg" nativeButton={false} render={<Link href="/login" />} className="w-full">
                Join Event
            </Button>
        );
    }

    // already joined: show it, plus a way to leave
    if (status === "joined") {
        return (
            <div className="flex flex-col gap-2">
                <Button type="button" size="lg" disabled className="w-full bg-success-bg text-success opacity-100">
                    <Check /> You&apos;re going
                </Button>
                {user && <LeaveEventButton eventId={eventId} userId={user.userId} title={eventTitle} className="w-full" />}
            </div>
        );
    }

    if (status === "ended") {
        return <Button type="button" size="lg" disabled className="w-full">This event has ended</Button>;
    }

    return (
        <Button type="button" size="lg" disabled={joining} onClick={handleJoin} className="w-full">
            {joining ? "Joining..." : "Join Event"}
        </Button>
    );
}
