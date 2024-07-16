import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import CustomProvider from "@/components/common/CustomProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Look",
  description: "Look chating app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CustomProvider>
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </CustomProvider>
    </html>
  );
}
