import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function getLoggedInUser() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect("/login");
    return session.user;
}

export async function getServerToken() {
    const jwtToken = await auth.api.getToken({ headers: await headers() });
    return jwtToken?.token || "";
}