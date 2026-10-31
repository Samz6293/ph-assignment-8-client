"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, CircleAlert, UserRound, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [password, setPassword] = useState("");

    const rules = [
        { label: "6+ characters", passed: password.length >= 6, error: "Password needs at least 6 characters." },
        { label: "A lowercase letter", passed: /[a-z]/.test(password), error: "Password needs at least one lowercase letter." },
        { label: "An uppercase letter", passed: /[A-Z]/.test(password), error: "Password needs at least one uppercase letter." },
    ];
    const failedRule = rules.find((rule) => !rule.passed);
    const showError = password !== "" && failedRule;

    return (
        <form className="flex flex-col gap-5 mt-8">
            {/* full name */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" type="text" placeholder="Rafiq Hasan"
                    value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            {/* email */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="rafiq@example.com" />
            </div>

            {/* photo url + avatar preview: image > first letter > icon */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="photoURL">Photo URL</Label>
                <div className="flex items-center gap-3">
                    <Avatar className="size-11 after:border-2 after:border-primary">
                        <AvatarImage src={photoURL || undefined} alt="Profile preview" />
                        <AvatarFallback className="bg-soft text-link font-bold">
                            {name.trim() ? name.trim()[0].toUpperCase() : <UserRound className="size-5" />}
                        </AvatarFallback>
                    </Avatar>
                    <Input id="photoURL" name="photoURL" type="url" placeholder="https://i.ibb.co/rafiq.jpg"
                        value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
                </div>
            </div>

            {/* password */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" aria-invalid={!!showError}
                    value={password} onChange={(e) => setPassword(e.target.value)} />

                {showError &&
                    <p className="error-text">
                        <CircleAlert className="size-4" /> {failedRule.error}
                    </p>
                }

                {/* live checklist */}
                <ul className="flex flex-col gap-1 mt-1 text-xs font-semibold">
                    {rules.map((rule) =>
                        <li key={rule.label} className={`flex items-center gap-1.5
                            ${rule.passed ? "text-success" : password ? "text-danger" : "text-muted-foreground"}`}>
                            {rule.passed ? <Check className="size-3.5" /> : <X className="size-3.5" />} {rule.label}
                        </li>
                    )}
                </ul>
            </div>

            <Button type="submit" size="lg" className="w-full mt-2">Create account</Button>

            <p className="text-muted-foreground text-center text-sm">
                Already have an account? <Link href="/login" className="text-link font-semibold underline underline-offset-2">Log in</Link>
            </p>
        </form>
    )
}
