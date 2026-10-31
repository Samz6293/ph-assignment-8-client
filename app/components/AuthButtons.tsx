"use client";
import { useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AuthButtons({ className }: { className?: string }) {
    // reads the logged-in user from the browser cookie, updates on login/logout
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    // show a welcome toast once, right after a login
    useEffect(() => {
        if (user && sessionStorage.getItem("justLoggedIn")) {
            toast.success(`Welcome, ${user.name}!`, { description: "You're logged in." });
            sessionStorage.removeItem("justLoggedIn");
        }
    }, [user]);

    // keep the space empty while checking, so Login doesn't flash for logged-in users
    if (isPending) return <div className={className} />;

    return (
        <div className={className}>
            {user ?
                <>
                    {/* avatar: photo, or first letter if there is no photo */}
                    <Avatar title={user.name} className="size-11 after:border-2 after:border-primary">
                        <AvatarImage src={user.image || undefined} alt={user.name} />
                        <AvatarFallback className="bg-soft text-link font-bold">{user.name[0]}</AvatarFallback>
                    </Avatar>

                    <Button variant="outline" size="lg" onClick={() => authClient.signOut()}
                        className="hover:bg-danger-bg hover:text-danger hover:border-danger
                        dark:hover:bg-danger-bg dark:hover:border-danger">
                        <LogOut /> Logout
                    </Button>
                </>
                :
                <Link href="/login" className="btn btn-primary">Login</Link>
            }
        </div>
    )
}
