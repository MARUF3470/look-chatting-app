"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const FormSchema = z.object({
  email: z.string().min(11, {
    message: "Email must be at least 11 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    const signInData = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    console.log(signInData);
    if (signInData?.ok) {
      toast({
        variant: "default",
        description: "Login Successfull",
      });
      return router.push("/");
    }
    if (!signInData?.ok) {
      toast({
        variant: "destructive",
        description: signInData?.error,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="link" size="sm" className="px-2 font-normal">
          <Link href="/authentication/reset">Forget Password?</Link>
        </Button>
        <div className="flex justify-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
