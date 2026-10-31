import { EventType } from "@/app/types";

// event types for the dropdown, each with its thumbnail tint
export const eventTypes: EventType[] = [
    { value: "cleanup", label: "Cleanup", tint: "bg-tint-cleanup" },
    { value: "plantation", label: "Plantation", tint: "bg-tint-plantation" },
    { value: "donation", label: "Donation", tint: "bg-tint-donation" },
    { value: "health", label: "Health", tint: "bg-tint-health" },
    { value: "education", label: "Education", tint: "bg-tint-education" },
];
