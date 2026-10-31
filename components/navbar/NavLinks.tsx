"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "@/app/types";

export default function NavLinks({ className, links }: { className?: string, links: NavLink[] }) {
    const pathname = usePathname();

    return (
        <div className={className}>
            {links.map((link) =>
                <Link key={link.href} href={link.href} className={`flex items-center h-full border-b-2 text-sm font-semibold
                    ${pathname === link.href ? "border-link text-link" : "border-transparent text-ink"}
                    hover:text-link`}>
                    {link.label}
                </Link>
            )}
        </div>
    )
}
