import type { Metadata } from "next";
import { Changa, Outfit, Cedarville_Cursive } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const changa = Changa({
  variable: "--font-changa",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cedarville = Cedarville_Cursive({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Joy Sengupta | Portfolio",
  description: "Portfolio of Joy Sengupta, Full Stack Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${changa.variable} ${outfit.variable} ${cedarville.variable} h-full antialiased font-sans scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
