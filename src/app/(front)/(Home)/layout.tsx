import Navbar from "@/components/HomeComponents/Navbar";
import Sidebar from "@/components/HomeComponents/sidebar";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page of look app",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-10 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
      foot
    </main>
  );
}
