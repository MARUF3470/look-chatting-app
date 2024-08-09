import Logout from "@/components/common/Logout";
import ThemeToggleBtn from "@/components/common/ThemeToggleBtn";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <section className="flex size-full flex-col gap-10">
      <h1 className="text-3xl font-bold">Home</h1>
      <Button>Click ME</Button>
      <ThemeToggleBtn />
      {session?.user?.email && <Logout />}
    </section>
  );
}
