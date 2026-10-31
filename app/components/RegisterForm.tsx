"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, CircleAlert, Eye, EyeOff, ImageIcon, Lock, Mail, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // password rules from the assignment
    const rules = [
        { label: "6+ characters", passed: password.length >= 6, error: "Password needs at least 6 characters." },
        { label: "A lowercase letter", passed: /[a-z]/.test(password), error: "Password needs at least one lowercase letter." },
        { label: "An uppercase letter", passed: /[A-Z]/.test(password), error: "Password needs at least one uppercase letter." },
    ];
    const failedRule = rules.find((rule) => !rule.passed);
    const showError = password !== "" && failedRule;

    return (
        <form className="mt-8">
            <FieldGroup>
                {/* full name */}
                <Field>
                    <FieldLabel htmlFor="name">Full name</FieldLabel>
                    <InputGroup>
                        <InputGroupAddon>
                            <UserRound />
                        </InputGroupAddon>
                        <InputGroupInput id="name" name="name" type="text" placeholder="Rafiq Hasan"
                            value={name} onChange={(e) => setName(e.target.value)} />
                    </InputGroup>
                </Field>

                {/* email */}
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <InputGroup>
                        <InputGroupAddon>
                            <Mail />
                        </InputGroupAddon>
                        <InputGroupInput id="email" name="email" type="email" placeholder="rafiq@example.com" />
                    </InputGroup>
                </Field>

                {/* photo url + avatar preview: image > first letter > icon */}
                <Field>
                    <FieldLabel htmlFor="photoURL">Photo URL</FieldLabel>
                    <div className="flex items-center gap-3">
                        <Avatar className="size-11 after:border-2 after:border-primary">
                            <AvatarImage src={photoURL || undefined} alt="Profile preview" />
                            <AvatarFallback className="bg-soft text-link font-bold">
                                {name.trim() ? name.trim()[0].toUpperCase() : <UserRound className="size-5" />}
                            </AvatarFallback>
                        </Avatar>
                        <InputGroup>
                            <InputGroupAddon>
                                <ImageIcon />
                            </InputGroupAddon>
                            <InputGroupInput id="photoURL" name="photoURL" type="url" placeholder="https://i.ibb.co/rafiq.jpg"
                                value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
                        </InputGroup>
                    </div>
                </Field>

                {/* password with show/hide button */}
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <InputGroup>
                        <InputGroupAddon>
                            <Lock />
                        </InputGroupAddon>
                        <InputGroupInput id="password" name="password" type={showPassword ? "text" : "password"} placeholder="••••••••"
                            aria-invalid={!!showError} value={password} onChange={(e) => setPassword(e.target.value)} />
                        <InputGroupAddon align="inline-end">
                            <InputGroupButton size="icon-xs" aria-label={showPassword ? "Hide password" : "Show password"}
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff /> : <Eye />}
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>

                    {showError &&
                        <FieldError className="flex items-center gap-1.5 font-medium">
                            <CircleAlert className="size-4" /> {failedRule.error}
                        </FieldError>
                    }

                    {/* live checklist */}
                    <ul className="flex flex-col gap-1 text-xs font-semibold">
                        {rules.map((rule) =>
                            <li key={rule.label} className={`flex items-center gap-1.5
                                ${rule.passed ? "text-success" : password ? "text-danger" : "text-muted-foreground"}`}>
                                {rule.passed ? <Check className="size-3.5" /> : <X className="size-3.5" />} {rule.label}
                            </li>
                        )}
                    </ul>
                </Field>

                <Button type="submit" size="lg" className="w-full">Create account</Button>

                <p className="text-muted-foreground text-center text-sm">
                    Already have an account? <Link href="/login" className="text-link font-bold">Log in</Link>
                </p>
            </FieldGroup>
        </form>
    )
}
