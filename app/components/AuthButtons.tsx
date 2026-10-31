import Link from "next/link";
import { LogOut } from "lucide-react";
import { User } from "../types";

// TODO: pass the logged-in user here once login is built
export default function AuthButtons({ className, user }: { className?: string, user?: User }) {
    const initials = user?.name.split(" ").map((word) => word[0]).join("").slice(0, 2);

    return (
        <div className={className}>
            {user ?
                <>
                    {/* avatar */}
                    <span title={user.name} className="flex items-center justify-center size-11 bg-soft text-link border-2 border-primary rounded-full text-sm font-bold">
                        {initials}
                    </span>

                    <button className="btn btn-outline">
                        <LogOut className="size-4" /> Logout
                    </button>
                </>
                :
                <Link href="/login" className="btn btn-primary">Login</Link>
            }
        </div>
    )
}
