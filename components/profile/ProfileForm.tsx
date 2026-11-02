"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircleAlert, ImageIcon, UserRound } from "lucide-react";
import { User } from "@/app/types";
import { UpdateProfile } from "@/lib/user";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export default function ProfileForm({ user }: { user: User }) {
    const router = useRouter();

    // start with the user's current name and photo
    const [name, setName] = useState(user.name);
    const [photoURL, setPhotoURL] = useState(user.image || "");
    const [saving, setSaving] = useState(false);

    // error messages ("" means the field is fine), photo is optional
    const nameError = name.trim().length < 3 ? "Name needs at least 3 characters." : "";
    const photoError = photoURL === "" || /^https?:\/\/\S+$/.test(photoURL) ? "" : "Paste an image link that starts with http:// or https://.";

    // put the fields back to what is saved
    const handleCancel = () => {
        setName(user.name);
        setPhotoURL(user.image || "");
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // stop here if anything is invalid, the errors show under the inputs
        if (nameError || photoError) return;

        setSaving(true);
        const success = await UpdateProfile({ name: name.trim(), photoURL });
        setSaving(false);
        if (success) router.refresh();
    }

    return (
        <Card>
            <CardContent>
                <CardTitle className="h-card mb-6">Personal details</CardTitle>

                <form onSubmit={handleSave} noValidate>
                    <FieldGroup>
                        {/* full name */}
                        <Field>
                            <FieldLabel htmlFor="name">Full name</FieldLabel>
                            <InputGroup>
                                <InputGroupAddon>
                                    <UserRound />
                                </InputGroupAddon>
                                <InputGroupInput id="name" name="name" type="text" placeholder="Rafiq Hasan"
                                    aria-invalid={!!nameError} value={name} onChange={(e) => setName(e.target.value)} />
                            </InputGroup>
                            {nameError &&
                                <FieldError className="flex items-center gap-1.5 font-medium">
                                    <CircleAlert className="size-4" /> {nameError}
                                </FieldError>
                            }
                        </Field>

                        {/* photo url */}
                        <Field>
                            <FieldLabel htmlFor="photoURL">Photo URL</FieldLabel>
                            <InputGroup>
                                <InputGroupAddon>
                                    <ImageIcon />
                                </InputGroupAddon>
                                <InputGroupInput id="photoURL" name="photoURL" type="url" placeholder="https://i.ibb.co/rafiq.jpg"
                                    aria-invalid={!!photoError} value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
                            </InputGroup>
                            {photoError &&
                                <FieldError className="flex items-center gap-1.5 font-medium">
                                    <CircleAlert className="size-4" /> {photoError}
                                </FieldError>
                            }
                        </Field>

                        {/* buttons */}
                        <div className="flex flex-col justify-end gap-3
                            sm:flex-row">
                            <Button type="submit" size="lg" disabled={saving}>
                                {saving ? <><Spinner /> Saving...</> : "Save changes"}
                            </Button>
                            <Button type="button" variant="outline" size="lg" onClick={handleCancel}
                                className="bg-transparent border-ink/70
                                dark:bg-transparent dark:border-ink/70">
                                Cancel
                            </Button>
                        </div>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
