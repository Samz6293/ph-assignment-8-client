"use client";
import { useLinkStatus } from "next/link";
import { Spinner } from "@/components/ui/spinner";

export default function FilterChipLabel({ label }: { label: string }) {
    const { pending } = useLinkStatus();

    return (
        <>
            {pending && <Spinner className="size-3.5" />}
            {label}
        </>
    );
}
