import type { Metadata } from "next";
import { Suspense } from "react";
import ProfileDetails from "@/components/profile/ProfileDetails";
import ProfileSkeleton from "@/components/profile/ProfileSkeleton";

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
                    <Suspense fallback={<ProfileSkeleton />}>
                        <ProfileDetails />
                    </Suspense>
                </div>
            </section>
        </>
    )
}
