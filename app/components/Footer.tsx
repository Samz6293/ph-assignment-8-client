import Link from "next/link";
import { Wifi } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { navLinks, yourSpaceLinks } from "@/lib/navlinks";

// the footer is dark in both themes, so it uses fixed stone colors instead of theme colors
const exploreLinks = [...navLinks, { label: "Gallery", href: "/#gallery" }];

const socialLinks = [
    { label: "GitHub", href: "https://github.com/Samz6293", icon: <FaGithub /> },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sabbir-sameer/", icon: <FaLinkedinIn /> },
];

export default function Footer() {
    return (
        <footer className="bg-footer text-stone-100 border-t-6 border-primary">
            <div className="container-page pt-14 pb-8">

                {/* about + link columns */}
                <div className="grid grid-cols-2 gap-10
                    md:grid-cols-4">
                    {/* logo, tagline, socials */}
                    <div className="col-span-2 flex flex-col gap-5">
                        <Link href="/" className="flex items-center gap-2 text-white">
                            <span className="flex items-center justify-center size-9 bg-primary text-on-primary rounded-xl">
                                <Wifi className="size-5" strokeWidth={2.5} />
                            </span>
                            <span className="font-heading text-2xl font-extrabold">Beacon</span>
                        </Link>
                        <p className="text-stone-400 max-w-sm text-sm leading-relaxed">
                            A community board for social service events. Find a cause near you, lend a hand, or start one yourself.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social) =>
                                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                                    className="flex items-center justify-center size-9 border border-stone-700 rounded-full text-sm
                                    hover:border-primary hover:text-primary">
                                    {social.icon}
                                </a>
                            )}
                        </div>
                    </div>

                    {/* explore */}
                    <div className="flex flex-col gap-4 text-sm">
                        <p className="eyebrow text-primary">Explore</p>
                        {exploreLinks.map((link) =>
                            <Link key={link.href} href={link.href} className="hover:text-primary">{link.label}</Link>
                        )}
                    </div>

                    {/* your space */}
                    <div className="flex flex-col gap-4 text-sm">
                        <p className="eyebrow text-primary">Your Space</p>
                        {yourSpaceLinks.map((link) =>
                            <Link key={link.href} href={link.href} className="hover:text-primary">{link.label}</Link>
                        )}
                    </div>
                </div>

                {/* copyright */}
                <div className="text-stone-400 border-t border-stone-800 mt-10 pt-8 text-sm">
                    © 2026 Beacon. Built for neighbors who show up.
                </div>
            </div>
        </footer>
    )
}
