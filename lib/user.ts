import { LoginFormData, ProfileFormData, RegisterFormData } from "@/app/types";
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

export const UpdateProfile = async (formData: ProfileFormData) => {
    const { error } = await authClient.updateUser({
        name: formData.name,
        image: formData.photoURL || null,
    });

    if (error) {
        toast.error("Couldn't save your changes", { description: error.message });
        return false;
    }

    toast.success("Profile updated", { description: "Your new name and photo are saved." });
    return true;
}

export const LogoutUser = async () => {
    const { error } = await authClient.signOut();

    if (error) {
        toast.error("Couldn't log you out", { description: error.message });
        return false;
    }

    toast.success("Logged out", { description: "See you at the next event." });
    return true;
}
