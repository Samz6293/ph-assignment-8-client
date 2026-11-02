"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteEvent } from "@/lib/fetch";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function DeleteEventButton({ id, title }: { id: string, title: string }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setDeleting(true);
        const success = await deleteEvent(id);
        setDeleting(false);

        if (success) {
            setOpen(false);
            router.refresh();
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger render={
                <Button type="button" size="sm" className="bg-danger-bg text-danger border-danger/30 rounded-full px-3
                    hover:bg-danger hover:text-white" />
            }>
                <Trash2 /> Delete
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-danger-bg text-danger">
                        <Trash2 />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete this event?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {title} will be removed for everyone who joined. This cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {/* keep + delete buttons */}
                <AlertDialogFooter>
                    <AlertDialogCancel size="lg" disabled={deleting} className="bg-transparent border-foreground/70
                        dark:bg-transparent dark:border-foreground/70">
                        Keep it
                    </AlertDialogCancel>
                    <AlertDialogAction size="lg" onClick={handleDelete} disabled={deleting} className="bg-danger text-white
                        dark:text-stone-950
                        hover:bg-danger/90">
                        {deleting ? <><Spinner /> Deleting...</> : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
