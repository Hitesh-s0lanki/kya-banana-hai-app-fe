"use client";


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "./logout-button";
import Image from "next/image";
import { useEffect, useState } from "react";

export const UserButton = () => {
    const [isMounted, setIsMounted] = useState(false)

    const user = useCurrentUser();

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <button className="shiny-button flex justify-center items-center bg-primary h-10 w-10">
                    <span className="icon font-semibold text-sm capitalize">{(user?.name || "?")[0]}</span>
                    <div className="shine"></div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                <LogoutButton>
                    <DropdownMenuItem>
                        <Image
                            src="/logout.svg"
                            alt="logout"
                            height={20}
                            width={20}
                        />
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};