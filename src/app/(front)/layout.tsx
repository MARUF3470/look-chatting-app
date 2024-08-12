import { ThemeProvider } from "@/components/theme-provider";
import "../globals.css";
import type { Metadata } from "next";
import StreamVideoProvider from "../../../providers/StreamClientProvider";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page of look app",
};

export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StreamVideoProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </StreamVideoProvider>
  );
}
