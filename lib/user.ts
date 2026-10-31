import { createAuthClient } from "better-auth/client";
const authClient = createAuthClient();

export const GoogleSignIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};