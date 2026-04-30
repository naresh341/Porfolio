import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./Context/ThemeContext";
import "./globals.css";
import { ReactLenis } from "lenis/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased `}
    >
      <body className="min-h-full flex flex-col ">
        {" "}
        <ReactLenis
          root
          options={{
            lerp: 0.1, // 0.1 is the sweet spot for "premium" smoothness
            duration: 1.5, // How long the scroll takes to settle
            smoothWheel: true,
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ReactLenis>
      </body>
    </html>
  );
}
