import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { QueryProviders } from "@/providers/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kya Banana Hai",
  description: "ek naya sawal hai, jo har din ke khane ko ek naya aur romanchak anubhav banata hai.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  return (
    <SessionProvider session={session} basePath={process.env.NEXTAUTH_BASEPATH}>
      <QueryProviders>
        <html lang="en">
          <body className={inter.className}>
            <Toaster />
            {children}</body>
        </html>
      </QueryProviders>
    </SessionProvider>
  );
}
