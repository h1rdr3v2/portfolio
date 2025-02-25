import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Destiny Ezenwata - Software Developer <> Mobile App Developer",
    description: "My simple portfolio",
    icons: {
        icon: "/favicon-32x32.png", // Default favicon
        apple: [
            { sizes: "57x57", url: "/apple-icon-57x57.png" },
            { sizes: "60x60", url: "/apple-icon-60x60.png" },
            { sizes: "72x72", url: "/apple-icon-72x72.png" },
            { sizes: "76x76", url: "/apple-icon-76x76.png" },
            { sizes: "114x114", url: "/apple-icon-114x114.png" },
            { sizes: "120x120", url: "/apple-icon-120x120.png" },
            { sizes: "144x144", url: "/apple-icon-144x144.png" },
            { sizes: "152x152", url: "/apple-icon-152x152.png" },
            { sizes: "180x180", url: "/apple-icon-180x180.png" },
        ],
        other: [
            { rel: "icon", type: "image/png", sizes: "192x192", url: "/android-icon-192x192.png" },
            { rel: "icon", type: "image/png", sizes: "96x96", url: "/favicon-96x96.png" },
            { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon-16x16.png" },
        ],
    },
    manifest: "/manifest.json"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
    >
        {children}
    </ThemeProvider>
    </body>
    </html>
  );
}
