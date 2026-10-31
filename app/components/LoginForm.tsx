"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form className="mt-8">
            <FieldGroup>
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

                {/* password with show/hide button */}
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <InputGroup>
                        <InputGroupAddon>
                            <Lock />
                        </InputGroupAddon>
                        <InputGroupInput id="password" name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
                        <InputGroupAddon align="inline-end">
                            <InputGroupButton size="icon-xs" aria-label={showPassword ? "Hide password" : "Show password"}
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff /> : <Eye />}
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
                </Field>

                <Button type="submit" size="lg" className="w-full">
                    Login <ArrowRight />
                </Button>

                <FieldSeparator className="text-xs">or</FieldSeparator>

                <Button type="button" variant="outline" size="lg" className="w-full bg-transparent border-ink/70
                    dark:bg-transparent dark:border-ink/70">
                    <FaGoogle /> Continue with Google
                </Button>

                <p className="text-muted-foreground text-center text-sm">
                    New to Beacon? <Link href="/register" className="text-link font-bold">Register</Link>
                </p>
            </FieldGroup>
        </form>
    )
}
