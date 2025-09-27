import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/Components/theme-provider";
import { UserProvider } from '@/Context/UserContext';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: "Late Night Chill",
  description: "Simple App that helps you arrange and organize your movies and tv shows ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
          <SessionProvider>
            <UserProvider>
              <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange>
              {children}
              </ThemeProvider>
          </UserProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
