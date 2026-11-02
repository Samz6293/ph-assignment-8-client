"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { leaveEvent } from "@/lib/fetch";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function LeaveEventButton({ eventId, userId, title, className }: { eventId: string, userId: string, title: string, className?: string }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [leaving, setLeaving] = useState(false);

    const handleLeave = async () => {
        setLeaving(true);
        const success = await leaveEvent(eventId, userId);
        setLeaving(false);

        if (success) {
            setOpen(false);
            router.refresh();
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger render={
                <Button type="button" variant="outline" size="lg" className={`bg-transparent border-line text-muted-foreground
                    dark:bg-transparent
                    hover:bg-danger-bg hover:text-danger hover:border-danger dark:hover:bg-danger-bg ${className}`} />
            }>
                <LogOut /> Leave event
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-danger-bg text-danger">
                        <LogOut />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Leave this event?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You will be removed from {title}. You can join again any time before it starts.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {/* stay + leave buttons */}
                <AlertDialogFooter>
                    <AlertDialogCancel size="lg" disabled={leaving} className="bg-transparent border-foreground/70
                        dark:bg-transparent dark:border-foreground/70">
                        Stay
                    </AlertDialogCancel>
                    <AlertDialogAction size="lg" onClick={handleLeave} disabled={leaving} className="bg-danger text-white
                        dark:text-stone-950
                        hover:bg-danger/90">
                        {leaving ? <><Spinner /> Leaving...</> : "Leave"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
