"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "@/app/types";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";

export default function MobileMenu({ links }: { links: NavLink[] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open menu"
                className="flex items-center justify-center size-10 bg-card text-ink border border-line rounded-full cursor-pointer
                hover:bg-muted">
                {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>

            {/* dropdown panel under the navbar */}
            {isOpen &&
                <div className="absolute top-full left-0 right-0 flex flex-col gap-4 bg-background border-b border-line px-6 pt-2 pb-6">
                    {/* close the panel when a link is clicked (not on every click, so the avatar menu can open) */}
                    <div onClick={() => setIsOpen(false)}>
                        <NavLinks className="flex flex-col gap-4" links={links} />
                    </div>
                    <AuthButtons className="flex items-center gap-3" onAction={() => setIsOpen(false)} />
                </div>
            }
        </div>
    )
}
