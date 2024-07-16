import Logout from "@/components/common/Logout";
import ThemeToggleBtn from "@/components/common/ThemeToggleBtn";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      Hello next
      <Button>Click ME</Button>
      <ThemeToggleBtn />
      {session?.user?.email && <Logout />}
    </div>
  );
}
