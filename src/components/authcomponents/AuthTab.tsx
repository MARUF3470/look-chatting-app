import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const AuthTab = () => {
  return (
    <Tabs defaultValue="login" className="w-[400px] border p-5">
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
