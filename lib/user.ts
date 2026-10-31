import { LoginFormData, RegisterFormData } from "@/app/types";
import { toast } from "sonner";
import { authClient } from "./auth-client";

// google
export const GoogleSignIn = async () => {
    // remember that a login started, so we can show a toast after Google redirects back
    sessionStorage.setItem("justLoggedIn", "true");
    await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
    });
};

// email
export const RegisterUser = async (formData: RegisterFormData) => {
    const { data, error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.photoURL || undefined, // BetterAuth calls the profile picture "image"
    });

    if (error) {
        toast.error("Couldn't create your account", { description: error.message });
        return false;
    }

    toast.success(`Welcome to Beacon, ${data.user.name}!`, { description: "Your account is ready." });
    return true;
}

export const LoginUser = async (formData: LoginFormData) => {
    const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
    });

    if (error) {
        toast.error("Couldn't log you in", { description: error.message });
        return false;
    }

    toast.success(`Welcome back, ${data.user.name}!`, { description: "You're logged in." });
    return true;
}