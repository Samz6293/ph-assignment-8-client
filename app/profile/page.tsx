import type { Metadata } from "next";
import { Suspense } from "react";
import ProfileDetails from "@/components/profile/ProfileDetails";

export const metadata: Metadata = {
    title: "Profile | Beacon",
};

export default function ProfilePage() {
    return (
        <>
            {/* page header */}
            <section className="bg-soft py-12
                md:py-16">
                <div className="container-page flex flex-col gap-3">
                    <p className="eyebrow text-link">Your account</p>
                    <h1 className="h-page">Profile</h1>
                    <p className="lead text-muted-foreground max-w-2xl">
                        Update your name and photo. They show on events you host and join.
                    </p>
                </div>
            </section>

            <section className="bg-surface py-12
                md:py-16">
                <div className="container-page max-w-5xl">
                    <Suspense fallback={
                        <div className="grid grid-cols-1 gap-6
                            md:grid-cols-[300px_minmax(0,1fr)]">
                            <div className="skeleton h-96" />
                            <div className="skeleton h-80" />
                        </div>
                    }>
                        <ProfileDetails />
                    </Suspense>
                </div>
            </section>
        </>
    )
}
