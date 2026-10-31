import { toast } from "sonner";
import { EventData, HostEventDeatails } from "@/app/types";

const baseurl = "http://localhost:8080";

export const handleHostEvent = async (hostEventDetails: HostEventDeatails) => {
    try {
        const res = await fetch(`${baseurl}/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(hostEventDetails)
        });

        const data = await res.json();
        if (!res.ok || !data.insertedId) throw new Error("The server did not save the event.");

        toast.success("Event published", {
            description: `ID: ${data.insertedId} · Hosted by ${hostEventDetails.hostName}`,
        });
        return true;
    }
    catch {
        toast.error("Couldn't publish your event", { description: "Check your connection and try again." });
        return false;
    }
}

export const getAllEvents = async() => {
    const res = await fetch(`${baseurl}/events`);
    const data = await res.json();
    return data;
}

export const getUpcomingEvents = async (limit?: number): Promise<EventData[]> => {
    try {
        const res = await fetch(`${baseurl}/events/upcoming${limit ? `?limit=${limit}` : ""}`);
        if (!res.ok) throw new Error("Couldn't load events.");
        return await res.json();
    }
    catch {
        // show the empty state instead of crashing the page
        return [];
    }
}

// one event by its id, or null if it doesn't exist (the page then shows 404)
export const getEventDetails = async (id: string): Promise<EventData | null> => {
    try {
        const res = await fetch(`${baseurl}/upcoming-events/${id}`);
        if (!res.ok) throw new Error("Couldn't load the event.");
        const text = await res.text();
        return text ? JSON.parse(text) : null; // the server sends an empty body when nothing is found
    }
    catch {
        return null;
    }
}