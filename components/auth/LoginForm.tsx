"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CircleAlert, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { GoogleSignIn, LoginUser } from "@/lib/user";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();

    // error messages
    const emailError = /^\S+@\S+\.\S+$/.test(email) ? "" : "Please enter a valid email.";
    const passwordError = password ? "" : "Please enter your password.";

    // errors stay hidden until the user types in that field or presses submit
    const showEmailError = (email !== "" || submitted) && emailError;
    const showPasswordError = (password !== "" || submitted) && passwordError;

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);

        // stop here if anything is invalid, the errors show under the inputs
        if (emailError || passwordError) return;

        const formData = { email, password };
        const success = await LoginUser(formData);
        if (success) router.push("/");
    }

    return (
        <form onSubmit={handleLogin} noValidate className="mt-8">
            <FieldGroup>
                {/* email */}
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <InputGroup>
                        <InputGroupAddon>
                            <Mail />
                        </InputGroupAddon>
                        <InputGroupInput id="email" name="email" type="email" placeholder="rafiq@example.com"
                            aria-invalid={!!showEmailError} value={email} onChange={(e) => setEmail(e.target.value)} />
                    </InputGroup>

                    {showEmailError &&
                        <FieldError className="flex items-center gap-1.5 font-medium">
                            <CircleAlert className="size-4" /> {emailError}
                        </FieldError>
                    }
                </Field>

                {/* password with show/hide button */}
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <InputGroup>
                        <InputGroupAddon>
                            <Lock />
                        </InputGroupAddon>
                        <InputGroupInput id="password" name="password" type={showPassword ? "text" : "password"} placeholder="••••••••"
                            aria-invalid={!!showPasswordError} value={password} onChange={(e) => setPassword(e.target.value)} />
                        <InputGroupAddon align="inline-end">
                            <InputGroupButton size="icon-xs" aria-label={showPassword ? "Hide password" : "Show password"}
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff /> : <Eye />}
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>

                    {showPasswordError &&
                        <FieldError className="flex items-center gap-1.5 font-medium">
                            <CircleAlert className="size-4" /> {passwordError}
                        </FieldError>
                    }
                </Field>

                <Button type="submit" size="lg" className="w-full">
                    Login <ArrowRight />
                </Button>

                <FieldSeparator className="text-xs">or</FieldSeparator>

                <Button onClick={GoogleSignIn} type="button" variant="outline" size="lg" className="w-full bg-transparent border-ink/70
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
