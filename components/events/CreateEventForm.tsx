"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, CircleAlert, ImageIcon, Lock, MapPin } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { eventTypes } from "@/lib/eventTypes";
import { formatDate, getTomorrow, isAfterToday } from "@/lib/date";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import EventCard from "@/components/shared/EventCard";
import { handleHostEvent } from "@/lib/fetch";

export default function CreateEventForm() {
    const { data: session } = authClient.useSession();
    const hostEmail = session?.user.email || "";
    const hostName = session?.user.name || "";

    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [date, setDate] = useState<Date | undefined>();
    const [location, setLocation] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [description, setDescription] = useState("");
    const [dateOpen, setDateOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();

    // error messages ("" means the field is fine)
    const titleError = title.trim().length < 5 ? "Title needs at least 5 characters." : "";
    const typeError = type ? "" : "Pick an event type.";
    const dateError = date && isAfterToday(date) ? "" : "Pick a date after today.";
    const locationError = location.trim().length < 3 ? "Add where the event happens." : "";
    const thumbnailError = /^https?:\/\/\S+$/.test(thumbnail) ? "" : "Paste an image link that starts with http:// or https://.";
    const descriptionError = description.trim().length < 20 ? "Description needs at least 20 characters." : "";

    // errors stay hidden until the user types in that field or presses submit
    const showTitleError = (title !== "" || submitted) && titleError;
    const showTypeError = submitted && typeError;
    const showDateError = submitted && dateError;
    const showLocationError = (location !== "" || submitted) && locationError;
    const showThumbnailError = (thumbnail !== "" || submitted) && thumbnailError;
    const showDescriptionError = (description !== "" || submitted) && descriptionError;

    const handleCreateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);

        // stop here if anything is invalid, the errors show under the inputs
        if (titleError || typeError || dateError || locationError || thumbnailError || descriptionError) return;

        const hostEventDetails = { title, type, date: date!.toISOString(), location, thumbnail, description, hostEmail, hostName };
        const success = await handleHostEvent(hostEventDetails);

        // assignment: after creating, go to the Upcoming Events page
        if (success) router.push("/upcoming-events");
    }

    return (
        <div className="grid grid-cols-1 items-start gap-8
            lg:grid-cols-[minmax(0,1fr)_380px]">

            {/* form card */}
            <form onSubmit={handleCreateEvent} noValidate className="bg-card border border-line rounded-panel p-6
                md:p-8">
                <h2 className="h-card mb-6">Event details</h2>

                <FieldGroup>
                    {/* title */}
                    <Field>
                        <FieldLabel htmlFor="title">Event title</FieldLabel>
                        <InputGroup>
                            <InputGroupInput id="title" name="title" type="text" placeholder="Book Drive for Korail School"
                                aria-invalid={!!showTitleError} value={title} onChange={(e) => setTitle(e.target.value)} />
                        </InputGroup>
                        {showTitleError &&
                            <FieldError className="flex items-center gap-1.5 font-medium">
                                <CircleAlert className="size-4" /> {titleError}
                            </FieldError>
                        }
                    </Field>

                    {/* event type */}
                    <Field>
                        <FieldLabel htmlFor="type">Event type</FieldLabel>
                        <Select items={eventTypes} value={type} onValueChange={(value) => setType(value as string)}>
                            <SelectTrigger id="type" aria-invalid={!!showTypeError} className="w-full">
                                <SelectValue placeholder="Choose a type" />
                            </SelectTrigger>
                            <SelectContent>
                                {eventTypes.map((item) =>
                                    <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                        {showTypeError &&
                            <FieldError className="flex items-center gap-1.5 font-medium">
                                <CircleAlert className="size-4" /> {typeError}
                            </FieldError>
                        }
                    </Field>

                    {/* date picker: days before tomorrow can't be picked */}
                    <Field>
                        <FieldLabel htmlFor="date">Event date</FieldLabel>
                        <Popover open={dateOpen} onOpenChange={setDateOpen}>
                            <PopoverTrigger id="date" aria-invalid={!!showDateError}
                                className={`flex items-center gap-3 w-full h-13 bg-card border border-input px-4 rounded-field text-[15px] text-left
                                ${date ? "text-foreground" : "text-muted-foreground"}
                                aria-invalid:border-destructive aria-invalid:text-destructive focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:outline-none`}>
                                <CalendarDays className="size-4 shrink-0" />
                                {date ? formatDate(date) : "Pick a date"}
                            </PopoverTrigger>
                            <PopoverContent align="start" className="w-auto p-0">
                                <Calendar mode="single" selected={date} disabled={{ before: getTomorrow() }}
                                    onSelect={(day) => { setDate(day); setDateOpen(false); }} />
                            </PopoverContent>
                        </Popover>
                        {showDateError &&
                            <FieldError className="flex items-center gap-1.5 font-medium">
                                <CircleAlert className="size-4" /> {dateError}
                            </FieldError>
                        }
                    </Field>

                    {/* location */}
                    <Field>
                        <FieldLabel htmlFor="location">Location</FieldLabel>
                        <InputGroup>
                            <InputGroupAddon>
                                <MapPin />
                            </InputGroupAddon>
                            <InputGroupInput id="location" name="location" type="text" placeholder="Korail, Mohakhali, Dhaka"
                                aria-invalid={!!showLocationError} value={location} onChange={(e) => setLocation(e.target.value)} />
                        </InputGroup>
                        {showLocationError &&
                            <FieldError className="flex items-center gap-1.5 font-medium">
                                <CircleAlert className="size-4" /> {locationError}
                            </FieldError>
                        }
                    </Field>

                    {/* thumbnail */}
                    <Field>
                        <FieldLabel htmlFor="thumbnail">Thumbnail image URL</FieldLabel>
                        <InputGroup>
                            <InputGroupAddon>
                                <ImageIcon />
                            </InputGroupAddon>
                            <InputGroupInput id="thumbnail" name="thumbnail" type="url" placeholder="https://i.ibb.co/book-drive.jpg"
                                aria-invalid={!!showThumbnailError} value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
                        </InputGroup>
                        {showThumbnailError &&
                            <FieldError className="flex items-center gap-1.5 font-medium">
                                <CircleAlert className="size-4" /> {thumbnailError}
                            </FieldError>
                        }
                    </Field>

                    {/* description */}
                    <Field>
                        <FieldLabel htmlFor="description">Description</FieldLabel>
                        <Textarea id="description" name="description" placeholder="What will people do, and what should they bring?"
                            aria-invalid={!!showDescriptionError} value={description} onChange={(e) => setDescription(e.target.value)} />
                        {showDescriptionError &&
                            <FieldError className="flex items-center gap-1.5 font-medium">
                                <CircleAlert className="size-4" /> {descriptionError}
                            </FieldError>
                        }
                    </Field>

                    {/* host email, read only */}
                    <Field>
                        <FieldLabel htmlFor="hostEmail">Host email</FieldLabel>
                        <InputGroup className="border-dashed bg-muted
                            dark:bg-muted">
                            <InputGroupAddon>
                                <Lock />
                            </InputGroupAddon>
                            <InputGroupInput id="hostEmail" name="hostEmail" type="email" readOnly value={hostEmail} className="text-muted-foreground" />
                        </InputGroup>
                        <FieldDescription className="text-xs">Saved from your account. You cannot change it here.</FieldDescription>
                    </Field>

                    {/* buttons */}
                    <div className="flex flex-col justify-start gap-3
                        sm:flex-row">
                        <Button type="submit" size="lg">Publish event</Button>
                        <Button variant="outline" size="lg" nativeButton={false} render={<Link href="/" />}
                            className="bg-transparent border-ink/70
                            dark:bg-transparent dark:border-ink/70">
                            Cancel
                        </Button>
                    </div>
                </FieldGroup>
            </form>

            {/* live preview, sticks to the screen on large screens */}
            <aside className="flex flex-col gap-3
                lg:sticky lg:top-24">
                <p className="eyebrow text-link">Live preview</p>
                <EventCard
                    title={title || "Your event title"}
                    type={type}
                    location={location || "Location"}
                    date={date ? formatDate(date, true) : "Event date"}
                    thumbnail={thumbnailError ? undefined : thumbnail}
                />
                <p className="text-muted-foreground text-xs">Hosted by {hostEmail}</p>
            </aside>
        </div>
    )
}
