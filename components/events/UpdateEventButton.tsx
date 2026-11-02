"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, CircleAlert, ImageIcon, MapPin, Pencil } from "lucide-react";
import { EventData } from "@/app/types";
import { eventTypes } from "@/lib/eventTypes";
import { formatDate, getTomorrow, isAfterToday } from "@/lib/date";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { updateEvent } from "@/lib/fetch";

// the Update button + a popup form filled with the event's current data
export default function UpdateEventButton({ event }: { event: EventData }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    // initial values
    const [title, setTitle] = useState(event.title);
    const [type, setType] = useState(event.type);
    const [date, setDate] = useState<Date | undefined>(new Date(event.date));
    const [location, setLocation] = useState(event.location);
    const [thumbnail, setThumbnail] = useState(event.thumbnail);
    const [description, setDescription] = useState(event.description);
    const [dateOpen, setDateOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [saving, setSaving] = useState(false);

    // error messages 
    const titleError = title.trim().length < 5 ? "Title needs at least 5 characters." : "";
    const typeError = type ? "" : "Pick an event type.";
    const dateError = date && isAfterToday(date) ? "" : "Pick a date after today.";
    const locationError = location.trim().length < 3 ? "Add where the event happens." : "";
    const thumbnailError = /^https?:\/\/\S+$/.test(thumbnail) ? "" : "Paste an image link that starts with http:// or https://.";
    const descriptionError = description.trim().length < 20 ? "Description needs at least 20 characters." : "";

    const showTitleError = (title !== "" || submitted) && titleError;
    const showDateError = submitted && dateError;
    const showLocationError = (location !== "" || submitted) && locationError;
    const showThumbnailError = (thumbnail !== "" || submitted) && thumbnailError;
    const showDescriptionError = (description !== "" || submitted) && descriptionError;

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);

        // stop here if anything is invalid, the errors show under the inputs
        if (titleError || typeError || dateError || locationError || thumbnailError || descriptionError) return;

        const updatedEvent = { title, type, date: date!.toISOString(), location, thumbnail, description };
        setSaving(true);
        const success = await updateEvent(event._id, updatedEvent);
        setSaving(false);

        if (success) {
            setOpen(false);
            router.refresh();
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button type="button" variant="outline" size="sm" className="rounded-full px-3" />}>
                <Pencil /> Update
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] gap-6 bg-card p-6 rounded-panel overflow-y-auto
                sm:max-w-2xl md:p-8">
                <DialogHeader>
                    <DialogTitle className="h-card text-2xl">Update event</DialogTitle>
                    <DialogDescription>Change any detail and save. Everyone who joined will see the new details.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleUpdate} noValidate>
                    <FieldGroup>
                        {/* title */}
                        <Field>
                            <FieldLabel htmlFor={`title-${event._id}`}>Event title</FieldLabel>
                            <InputGroup>
                                <InputGroupInput id={`title-${event._id}`} type="text"
                                    aria-invalid={!!showTitleError} value={title} onChange={(e) => setTitle(e.target.value)} />
                            </InputGroup>
                            {showTitleError &&
                                <FieldError className="flex items-center gap-1.5 font-medium">
                                    <CircleAlert className="size-4" /> {titleError}
                                </FieldError>
                            }
                        </Field>

                        {/* type + date side by side on larger screens */}
                        <div className="grid grid-cols-1 gap-5
                            sm:grid-cols-2">
                            <Field>
                                <FieldLabel htmlFor={`type-${event._id}`}>Event type</FieldLabel>
                                <Select items={eventTypes} value={type} onValueChange={(value) => setType(value as string)}>
                                    <SelectTrigger id={`type-${event._id}`} className="w-full">
                                        <SelectValue placeholder="Choose a type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {eventTypes.map((item) =>
                                            <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </Field>

                            {/* date picker: days before tomorrow can't be picked */}
                            <Field>
                                <FieldLabel htmlFor={`date-${event._id}`}>Event date</FieldLabel>
                                <Popover open={dateOpen} onOpenChange={setDateOpen}>
                                    <PopoverTrigger id={`date-${event._id}`} aria-invalid={!!showDateError}
                                        className="flex items-center gap-3 w-full h-13 bg-card border border-input px-4 rounded-field text-[15px] text-left
                                        aria-invalid:border-destructive aria-invalid:text-destructive focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:outline-none">
                                        <CalendarDays className="size-4 shrink-0" />
                                        {date ? formatDate(date) : "Pick a date"}
                                    </PopoverTrigger>
                                    <PopoverContent align="start" className="w-auto p-0">
                                        <Calendar mode="single" selected={date} defaultMonth={date} disabled={{ before: getTomorrow() }}
                                            onSelect={(day) => { setDate(day); setDateOpen(false); }} />
                                    </PopoverContent>
                                </Popover>
                                {showDateError &&
                                    <FieldError className="flex items-center gap-1.5 font-medium">
                                        <CircleAlert className="size-4" /> {dateError}
                                    </FieldError>
                                }
                            </Field>
                        </div>

                        {/* location */}
                        <Field>
                            <FieldLabel htmlFor={`location-${event._id}`}>Location</FieldLabel>
                            <InputGroup>
                                <InputGroupAddon>
                                    <MapPin />
                                </InputGroupAddon>
                                <InputGroupInput id={`location-${event._id}`} type="text"
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
                            <FieldLabel htmlFor={`thumbnail-${event._id}`}>Thumbnail image URL</FieldLabel>
                            <InputGroup>
                                <InputGroupAddon>
                                    <ImageIcon />
                                </InputGroupAddon>
                                <InputGroupInput id={`thumbnail-${event._id}`} type="url"
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
                            <FieldLabel htmlFor={`description-${event._id}`}>Description</FieldLabel>
                            <Textarea id={`description-${event._id}`}
                                aria-invalid={!!showDescriptionError} value={description} onChange={(e) => setDescription(e.target.value)} />
                            {showDescriptionError &&
                                <FieldError className="flex items-center gap-1.5 font-medium">
                                    <CircleAlert className="size-4" /> {descriptionError}
                                </FieldError>
                            }
                        </Field>

                        {/* buttons */}
                        <div className="flex justify-end gap-3">
                            <DialogClose render={
                                <Button type="button" variant="outline" size="lg" className="bg-transparent border-ink/70
                                    dark:bg-transparent dark:border-ink/70" />
                            }>
                                Cancel
                            </DialogClose>
                            <Button type="submit" size="lg" disabled={saving}>
                                {saving ? <><Spinner /> Saving...</> : "Save changes"}
                            </Button>
                        </div>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    )
}
