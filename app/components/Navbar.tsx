import { Suspense } from "react";
import Link from "next/link";
import { Wifi } from "lucide-react";
import { NavLink } from "../types";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import AuthButtons from "./AuthButtons";
import MobileMenu from "./MobileMenu";

// add a new page link here
const navLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Upcoming Events", href: "/events" },
];

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-background border-b border-line">
            <div className="container-page flex items-center justify-between h-18">

                {/* logo + links */}
                <div className="flex items-center gap-8 h-full">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="flex items-center justify-center size-9 bg-primary text-on-primary rounded-xl">
                            <Wifi className="size-5" strokeWidth={2.5} />
                        </span>
                        <span className="text-ink font-heading text-2xl font-extrabold">Beacon</span>
                    </Link>

                    {/* NavLinks reads the current URL, so Next.js needs a Suspense around it */}
                    <Suspense>
                        <NavLinks className="hidden gap-7 h-full
                            md:flex" links={navLinks} />
                    </Suspense>
                </div>

                {/* theme toggle + auth buttons */}
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <AuthButtons className="hidden items-center gap-3
                        md:flex" />
                    <MobileMenu links={navLinks} />
                </div>
            </div>
        </nav>
    )
}
