import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// design only: the assignment says no subscribe functionality is needed
export default function Newsletter() {
    return (
        <section className="bg-background py-16
            md:py-24">
            <div className="container-page">
                {/* coral band, same colors in both themes */}
                <div className="relative grid grid-cols-1 items-center gap-8 bg-primary text-on-primary p-8 rounded-band overflow-hidden
                    md:grid-cols-2 md:p-12">
                    {/* decorative rings in the top right corner */}
                    <svg aria-hidden viewBox="0 0 400 400" className="absolute -top-40 -right-24 size-100 text-white opacity-30">
                        {[80, 130, 199].map((radius) =>
                            <circle key={radius} cx="200" cy="200" r={radius} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                        )}
                    </svg>

                    {/* text */}
                    <div className="relative flex flex-col gap-2">
                        <h2 className="h-section text-on-primary">New events, every Friday</h2>
                        <p className="text-on-primary/80">One short email with causes near you. Unsubscribe anytime.</p>
                    </div>

                    {/* email + subscribe */}
                    <div className="relative flex flex-col gap-2">
                        <Label htmlFor="newsletter-email" className="text-on-primary">Email address</Label>
                        <div className="flex flex-col gap-3
                            sm:flex-row">
                            <Input id="newsletter-email" type="email" placeholder="you@example.com"
                                className="bg-white text-stone-900 border-transparent rounded-full placeholder:text-stone-500
                                dark:bg-white" />
                            <Button type="button" size="lg" className="shrink-0 bg-stone-900 text-white h-13
                                hover:bg-stone-800">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
