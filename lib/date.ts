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

// "12 Oct 2026", or "Mon, 12 Oct 2026" with the weekday
export function formatDate(date: Date, withWeekday = false) {
    return date.toLocaleDateString("en-GB", {
        weekday: withWeekday ? "short" : undefined,
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}
