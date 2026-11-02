"use client";
import { useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { profileLinks } from "@/lib/navlinks";
import { LogoutUser } from "@/lib/user";
import { useRouter } from "next/navigation";

export default function AuthButtons({ className, onAction }: { className?: string, onAction?: () => void }) {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();

    // show a welcome toast once, right after a login
    useEffect(() => {
        if (user && sessionStorage.getItem("justLoggedIn")) {
            toast.success(`Welcome, ${user.name}!`, { description: "You're logged in." });
            sessionStorage.removeItem("justLoggedIn");
        }
    }, [user]);

    const handleLogout = async () => {
        const success = await LogoutUser();
        if (!success) return;
        onAction?.(); // close the mobile menu (does nothing on desktop)
        router.push("/"); // leave private pages after logging out
    }

    // keep the space empty while checking, so Login doesn't flash for logged-in users
    if (isPending) return <div className={className} />;

    return (
        <div className={className}>
            {user ?
                <>
                    {/* avatar: hover shows the name, click opens the menu */}
                    <DropdownMenu>
                        <Tooltip>
                            {/* one button that is both the tooltip trigger and the menu trigger */}
                            <TooltipTrigger render={<DropdownMenuTrigger aria-label="Open profile menu" className="rounded-full" />}>
                                <Avatar className="size-11 after:border-2 after:border-primary">
                                    <AvatarImage src={user.image || undefined} alt={user.name} />
                                    <AvatarFallback className="bg-soft text-link font-bold">{user.name[0]}</AvatarFallback>
                                </Avatar>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">{user.name}</TooltipContent>
                        </Tooltip>

                        <DropdownMenuContent align="end" className="w-56 p-2">
                            {/* name + email */}
                            <DropdownMenuGroup>
                                <DropdownMenuLabel className="flex flex-col gap-0.5">
                                    <span className="text-foreground text-sm font-bold">{user.name}</span>
                                    <span className="truncate">{user.email}</span>
                                </DropdownMenuLabel>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />

                            {profileLinks.map((link) =>
                                <DropdownMenuItem key={link.href} render={<Link href={link.href} />} onClick={onAction} className="py-2 cursor-pointer">
                                    {link.label}
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant="outline" size="lg" onClick={handleLogout}
                        className="hover:bg-danger-bg hover:text-danger hover:border-danger
                        dark:hover:bg-danger-bg dark:hover:border-danger">
                        <LogOut /> Logout
                    </Button>
                </>
                :
                <Link href="/login" onClick={onAction} className="btn btn-primary">Login</Link>
            }
        </div>
    )
}
