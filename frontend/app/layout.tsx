import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "./Context/ThemeContext";
import "./globals.css";
import { ReactLenis } from "lenis/react";
import Navbar from "./components/ui/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Naresh's Portfolio",
  description:
    "A showcase of Naresh's projects and skills in software development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased `}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ReactLenis
          root
          options={{
            lerp: 0.1,
            duration: 1.5,
            smoothWheel: true,
          }}
        >
          <ThemeProvider>
            <div className="px-6 lg:px-16">
              <Navbar />
            </div>
            {children}
          </ThemeProvider>
        </ReactLenis>
      </body>
    </html>
  );
}
