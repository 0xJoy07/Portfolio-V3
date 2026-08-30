import type { Metadata } from "next";
import { Changa } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const changa = Changa({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-changa",
  display: "swap",
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
      className={`h-full antialiased scroll-smooth ${changa.variable}`}
    >
      <body className="min-h-full flex flex-col font-sans">
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
