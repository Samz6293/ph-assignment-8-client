import { toast } from "sonner";
import { EventData, HostEventDeatails, UpdateEvent } from "@/app/types";

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
            description: `Hosted by ${hostEventDetails.hostName} · ID: ${data.insertedId}`,
        });
        return true;
    }
    catch {
        toast.error("Couldn't publish your event", { description: "Check your connection and try again." });
        return false;
    }
}

export const getPastEvents = async() => {
    const res = await fetch(`${baseurl}/events/previous`);
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

export const getEventDetails = async (id: string): Promise<EventData | null> => {
    try {
        const res = await fetch(`${baseurl}/event-details/${id}`);
        if (!res.ok) throw new Error("Couldn't load the event.");
        const text = await res.text();
        return text ? JSON.parse(text) : null; // the server sends an empty body when nothing is found
    }
    catch {
        return null;
    }
}

export const getEventByHost = async (id: string): Promise<EventData[]> => {
    try {
        const res = await fetch(`${baseurl}/manage-events/${id}`);
        if (!res.ok) throw new Error("Couldn't load your events.");
        return await res.json();
    }
    catch {
        return [];
    }
}

export const deleteEvent = async (id: string) => {
    try {
        const res = await fetch(`${baseurl}/events/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (!res.ok || data.deletedCount !== 1) throw new Error("The server did not delete the event.");

        toast.success("Event deleted", { description: "It is no longer on the board." });
        return true;
    }
    catch {
        toast.error("Couldn't delete the event", { description: "Check your connection and try again." });
        return false;
    }
}

export const updateEvent = async (id: string, updatedEvent: UpdateEvent) => {
    try {
        const res = await fetch(`${baseurl}/events/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedEvent)
        });
        const data = await res.json();
        if (!res.ok) throw new Error("The server did not update the event.");

        if (data.matchedCount === 0) {
            toast.error("Couldn't find this event", { description: "It may have been deleted. Reload the page and try again." });
            return false;
        }
        if (data.modifiedCount === 0) {
            toast.info("No changes to save", { description: "The event already has these details." });
            return true;
        }

        toast.success("Event updated", { description: `${updatedEvent.title} now shows the new details.` });
        return true;
    }
    catch {
        toast.error("Couldn't update the event", { description: "Check your connection and try again." });
        return false;
    }
}