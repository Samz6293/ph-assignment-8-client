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
