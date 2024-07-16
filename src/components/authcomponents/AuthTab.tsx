"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "../ui/use-toast";

const AuthTab = () => {
  const { status } = useSession();
  const router = useRouter();
  console.log(status);
  useEffect(() => {
    if (status === "authenticated") {
      toast({
        variant: "default",
        description: "You are already logged in.",
      });
      return router.push("/");
    }
  }, [status]);
  return (
    <Tabs defaultValue="login" className="w-[400px] border p-5">
      <h4 className="text-center mb-5">Authentication</h4>
      <TabsList className="w-full">
        <TabsTrigger value="login" className="w-full">
          Login
        </TabsTrigger>
        <TabsTrigger value="registration" className="w-full">
          Registration
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="registration">
        <RegistrationForm />
      </TabsContent>
    </Tabs>
  );
};

export default AuthTab;
