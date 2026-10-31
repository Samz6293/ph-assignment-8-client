import { NavLink } from "@/app/types";

// add a new page link here
export const navLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Upcoming Events", href: "/upcoming-events" },
];

// private pages, used in the footer and the profile dropdown
export const yourSpaceLinks: NavLink[] = [
    { label: "Create Event", href: "/create-event" },
    { label: "Manage Events", href: "/manage-events" },
    { label: "Joined Events", href: "/joined-events" },
];

// profile dropdown in the navbar
export const profileLinks: NavLink[] = [
    { label: "Profile", href: "/profile" },
    ...yourSpaceLinks,
];
