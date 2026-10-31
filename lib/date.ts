// today at 00:00 (time removed, so we only compare days)
export function getToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}

// tomorrow at 00:00, the earliest day an event can be on
export function getTomorrow() {
    const tomorrow = getToday();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
}

export function getCurrentYear() {
    return new Date().getFullYear();
}

// true if the date is tomorrow or later
export function isAfterToday(date: Date) {
    return date >= getTomorrow();
}

// "Saturday, 14 November 2026"
export function formatLongDate(date: Date) {
    return date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

// pieces for a calendar tile: { month: "NOV", day: "14", weekday: "Saturday" }
export function getDateParts(date: Date) {
    return {
        month: date.toLocaleDateString("en-GB", { month: "short" }).toUpperCase(),
        day: date.toLocaleDateString("en-GB", { day: "numeric" }),
        weekday: date.toLocaleDateString("en-GB", { weekday: "long" }),
    };
}

// "Aug 2026"
export function formatMonthYear(date: Date) {
    return date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

// "12 Oct 2026", or "Mon, 12 Oct 2026" with the weekday
export function formatDate(date: Date, withWeekday = false) {
    return date.toLocaleDateString("en-GB", {
        weekday: withWeekday ? "short" : undefined,
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}
