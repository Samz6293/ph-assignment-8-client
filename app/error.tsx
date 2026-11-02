"use client"; // Next.js requires error pages to be client components
import { useEffect } from "react";
import { ExternalLink, RotateCw, Server, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const steps = [
    { title: "Open the API link", text: "" },
    { title: "Look for a smiley face", text: "If you see it, the server is awake." },
    { title: "Come back and refresh", text: "Your events will load again." },
];

export default function Error({ error, retry }: { error: unknown, retry: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <section className="relative flex flex-col items-center justify-center min-h-[70vh] bg-soft py-20 overflow-hidden">
            {/* beacon rings: coral in light mode, soft grey in dark mode */}
            <svg aria-hidden viewBox="0 0 600 600" className="absolute top-1/2 left-1/2 size-150 -translate-x-1/2 -translate-y-1/2 text-primary opacity-25
                dark:text-stone-100 dark:opacity-10">
                {[150, 210, 270, 299].map((radius) =>
                    <circle key={radius} cx="300" cy="300" r={radius} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                )}
            </svg>

            <div className="container-page relative flex flex-col items-center gap-4 text-center">
                <span className="flex items-center justify-center size-16 bg-card text-primary border border-line rounded-2xl">
                    <Server className="size-7" />
                </span>
                <p className="eyebrow text-link mt-2">Server down</p>
                <h1 className="h-section">Beacon cannot reach its server.</h1>
                <p className="lead text-muted-foreground max-w-md">
                    The server is probably waking up. Check it with the link below, then come back.
                </p>

                {/* 3 steps */}
                <ol className="flex flex-col w-full max-w-md bg-card border border-line px-5 mt-4 rounded-card text-left">
                    {steps.map((step, index) =>
                        <li key={step.title} className="flex items-center gap-4 border-b border-line py-4
                            last:border-b-0">
                            <span className="flex items-center justify-center shrink-0 size-8 bg-soft text-link rounded-full text-xs font-bold">
                                {index + 1}
                            </span>
                            <div className="flex flex-col items-start gap-1.5 min-w-0">
                                <p className={`font-bold ${index === 1 && "text-link"}`}>{step.title}</p>
                                {index === 0 &&
                                    <a href={apiUrl} target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-2 max-w-full border border-ink/70 px-3 py-1.5 rounded-full text-sm font-bold break-all
                                        hover:bg-muted">
                                        {apiUrl} <ExternalLink className="size-3.5 shrink-0" />
                                    </a>
                                }
                                {index === 1 && <Smile className="size-5 text-link" />}
                                {step.text && <p className="text-muted-foreground text-xs">{step.text}</p>}
                            </div>
                        </li>
                    )}
                </ol>

                {/* buttons */}
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                    <Button size="lg" onClick={() => retry()}>
                        <RotateCw /> Try again
                    </Button>
                    <Button variant="outline" size="lg" nativeButton={false} render={<a href={apiUrl} target="_blank" rel="noopener noreferrer" />}
                        className="bg-transparent border-ink/70
                        dark:bg-transparent dark:border-ink/70">
                        Open the API <ExternalLink />
                    </Button>
                </div>
            </div>
        </section>
    )
}
