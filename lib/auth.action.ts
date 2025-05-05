"use server";

import { signIn, signOut } from "@/auth"

export const login = async () => await signIn("google")

export async function signOutAction() {
    await signOut({ redirectTo: "/auth" });
}