import { ClerkProvider, auth } from "@clerk/nextjs";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import AdminProvider from "@/providers/admin-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SNX Admin",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <AdminProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Navbar isLogin={userId ? true : false} />
              {children}
              <Toaster />
            </ThemeProvider>
          </AdminProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
