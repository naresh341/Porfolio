import type { Metadata } from "next";
import {
  Space_Grotesk,
  Syne,
  Geist_Mono,
  Playfair_Display,
} from "next/font/google";
import { ThemeProvider } from "./Context/ThemeContext";
import "./globals.css";
import { ReactLenis } from "lenis/react";
import Navbar from "./components/ui/Navbar";
import IntroLoader from "./components/ui/IntroLoader";
import GlobalCursor from "./components/ui/GlobalCursor";
import ScrollToTop from "./components/ui/ScrollToTop";
import { DevToolsGuard } from "./components/MiniComponents/DevToolsGuard";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
  title: "Naresh Bhati — Full Stack Developer",
  description:
    "Portfolio of Naresh Bhati — Full Stack Developer building enterprise apps, modern UIs, and scalable systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${syne.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        style={{ cursor: "none" }}
      >
        <DevToolsGuard>
          <ReactLenis
            root
            options={{
              lerp: 0.1,
              duration: 1.5,
              smoothWheel: true,
            }}
          >
            <ThemeProvider>
              <ScrollToTop />
              <IntroLoader />
              <div className="px-6 lg:px-16">
                <Navbar />
              </div>
              {children}
              <GlobalCursor />
            </ThemeProvider>
          </ReactLenis>
        </DevToolsGuard>
      </body>
    </html>
  );
}
