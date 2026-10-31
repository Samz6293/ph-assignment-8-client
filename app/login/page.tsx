import type { Metadata } from "next";
import { Wifi } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import NextUpCard from "@/components/shared/NextUpCard";

export const metadata: Metadata = {
    title: "Login | Beacon",
};

export default function LoginPage() {
    return (
        <section className="bg-surface py-16
            md:py-24">
            <div className="container-page">
                {/* card */}
                <div className="grid grid-cols-1 max-w-5xl bg-card border border-line mx-auto rounded-panel overflow-hidden
                    md:grid-cols-2">

                    {/* coral panel */}
                    <div className="relative hidden flex-col gap-10 bg-primary text-on-primary p-12 overflow-hidden
                        md:flex">
                        {/* decorative rings */}
                        <svg aria-hidden viewBox="0 0 400 400" className="absolute -right-32 -bottom-32 size-112 text-stone-900 opacity-15">
                            {[50, 100, 150, 199].map((radius) =>
                                <circle key={radius} cx="200" cy="200" r={radius} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                            )}
                        </svg>

                        {/* logo (dark mark on coral) */}
                        <div className="relative flex items-center gap-2">
                            <span className="flex items-center justify-center size-9 bg-stone-900 text-primary rounded-xl">
                                <Wifi className="size-5" strokeWidth={2.5} />
                            </span>
                            <span className="font-heading text-2xl font-extrabold">Beacon</span>
                        </div>

                        {/* welcome text */}
                        <div className="relative flex flex-col gap-4 my-auto">
                            <p className="eyebrow">Welcome back</p>
                            <h2 className="font-heading text-5xl font-extrabold leading-none tracking-tight">Good to see you again.</h2>
                            <p className="text-on-primary/80 leading-relaxed">
                                Pick up where you left off. The events you joined and the ones you host are waiting.
                            </p>
                        </div>

                        <NextUpCard className="relative max-w-xs" />
                    </div>

                    {/* form side */}
                    <div className="min-w-0 p-6
                        sm:p-8 md:p-12">
                        <h1 className="font-heading text-4xl font-extrabold tracking-tight">Login</h1>
                        <p className="text-muted-foreground mt-3 leading-relaxed">Use your email and password, or continue with Google.</p>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </section>
    )
}
