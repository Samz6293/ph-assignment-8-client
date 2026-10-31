import type { Metadata } from "next";
import Image from "next/image";
import volunteers from "@/public/volunteers.jpg";
import RegisterForm from "../components/RegisterForm";

export const metadata: Metadata = {
    title: "Register | Beacon",
};

const perks = [
    "Host events and edit them anytime from Manage Events.",
    "Join with one tap and see it in Joined Events.",
    "Your name and photo show on events you host.",
];

export default function RegisterPage() {
    return (
        <section className="bg-surface py-16
            md:py-24">
            <div className="container-page">
                {/* card */}
                <div className="grid grid-cols-1 max-w-5xl bg-card border border-line mx-auto rounded-panel overflow-hidden
                    md:grid-cols-2">

                    {/* form side */}
                    <div className="min-w-0 p-6
                        sm:p-8 md:p-12">
                        <h1 className="font-heading text-3xl font-extrabold tracking-tight">Create your account</h1>
                        <p className="text-muted-foreground mt-2 text-sm">Takes a minute. Then you can host and join events.</p>
                        <RegisterForm />
                    </div>

                    {/* dark panel (dark in both themes) */}
                    <div className="relative hidden flex-col justify-between gap-10 bg-footer text-stone-100 p-12 overflow-hidden
                        md:flex">
                        {/* decorative rings (svg stays sharp at any size) */}
                        <svg aria-hidden viewBox="0 0 400 400" className="absolute -top-40 -right-40 size-96 text-stone-100 opacity-5">
                            {[50, 100, 150, 199].map((radius) =>
                                <circle key={radius} cx="200" cy="200" r={radius} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                            )}
                        </svg>

                        {/* heading + perks */}
                        <div className="relative flex flex-col gap-6">
                            <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight">
                                One account,<br />
                                <span className="text-primary">every cause nearby.</span>
                            </h2>
                            <ol className="flex flex-col gap-3 text-sm">
                                {perks.map((perk, index) =>
                                    <li key={perk} className="flex items-center gap-3">
                                        <span className="flex items-center justify-center shrink-0 size-6 bg-primary text-on-primary rounded-full text-xs font-bold">
                                            {index + 1}
                                        </span>
                                        {perk}
                                    </li>
                                )}
                            </ol>
                        </div>

                        <Image src={volunteers} alt="Four smiling volunteers in matching t-shirts" placeholder="blur" sizes="500px"
                            className="relative w-full h-56 object-cover rounded-card" />
                    </div>
                </div>
            </div>
        </section>
    )
}
