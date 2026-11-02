"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, CircleAlert, Eye, EyeOff, ImageIcon, Lock, Mail, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaGoogle } from "react-icons/fa";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { GoogleSignIn, RegisterUser } from "@/lib/user";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const router = useRouter();

    // password rules 
    const rules = [
        { label: "6+ characters", passed: password.length >= 6, error: "Password needs at least 6 characters." },
        { label: "A lowercase letter", passed: /[a-z]/.test(password), error: "Password needs at least one lowercase letter." },
        { label: "An uppercase letter", passed: /[A-Z]/.test(password), error: "Password needs at least one uppercase letter." },
    ];
    const failedRule = rules.find((rule) => !rule.passed);

    // error messages
    const nameError = name.trim().length < 3 ? "Name needs at least 3 characters." : "";
    const emailError = /^\S+@\S+\.\S+$/.test(email) ? "" : "Please enter a valid email.";
    const passwordError = failedRule ? failedRule.error : "";

    // errors stay hidden until the user types in that field or presses submit
    const showNameError = (name !== "" || submitted) && nameError;
    const showEmailError = (email !== "" || submitted) && emailError;
    const showError = (password !== "" || submitted) && passwordError;

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);

        // stop here if anything is invalid, the errors show under the inputs
        if (nameError || emailError || passwordError) return;

        setLoading(true);
        const formData = { name, email, photoURL, password };
        const success = await RegisterUser(formData);
        if (success) router.push("/");
        else setLoading(false);
    }

    // Google sends the browser to its own page, the spinner stays until it leaves
    const handleGoogle = async () => {
        setGoogleLoading(true);
        await GoogleSignIn();
        setGoogleLoading(false);
    }

    return (
        <form onSubmit={handleRegister} noValidate className="mt-8">
            <FieldGroup>
                {/* full name */}
                <Field>
                    <FieldLabel htmlFor="name">Full name</FieldLabel>
                    <InputGroup>
                        <InputGroupAddon>
                            <UserRound />
                        </InputGroupAddon>
                        <InputGroupInput id="name" name="name" type="text" placeholder="Rafiq Hasan"
                            aria-invalid={!!showNameError} value={name} onChange={(e) => setName(e.target.value)} />
                    </InputGroup>

                    {showNameError &&
                        <FieldError className="flex items-center gap-1.5 font-medium">
                            <CircleAlert className="size-4" /> {nameError}
                        </FieldError>
                    }
                </Field>

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
                            <CircleAlert className="size-4" /> {passwordError}
                        </FieldError>
                    }

                    {/* live checklist */}
                    <ul className="flex flex-col gap-1 text-xs font-semibold">
                        {rules.map((rule) =>
                            <li key={rule.label} className={`flex items-center gap-1.5
                                ${rule.passed ? "text-success" : password || submitted ? "text-danger" : "text-muted-foreground"}`}>
                                {rule.passed ? <Check className="size-3.5" /> : <X className="size-3.5" />} {rule.label}
                            </li>
                        )}
                    </ul>
                </Field>

                <Button type="submit" size="lg" disabled={loading} className="w-full">
                    {loading ? <><Spinner /> Creating account...</> : "Create account"}
                </Button>

                <FieldSeparator className="text-xs">or</FieldSeparator>

                <Button onClick={handleGoogle} type="button" variant="outline" size="lg" disabled={googleLoading} className="w-full bg-transparent border-ink/70
                    dark:bg-transparent dark:border-ink/70">
                    {googleLoading ? <><Spinner /> Opening Google...</> : <><FaGoogle /> Continue with Google</>}
                </Button>

                <p className="text-muted-foreground text-center text-sm">
                    Already have an account? <Link href="/login" className="text-link font-bold">Log in</Link>
                </p>
            </FieldGroup>
        </form>
    )
}
