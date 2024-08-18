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
import { toast } from "../ui/use-toast";

import Link from "next/link";
import { NewPasswordSchema } from "@/schemas/schema";
import { startTransition, useState } from "react";
import { reset } from "@/app/utils/passwordReset";
import { useRouter, useSearchParams } from "next/navigation";
import { newPassword } from "@/app/utils/newPassword";

const NewPasswordForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const param = useSearchParams();
  const router = useRouter();
  const token = param.get("token");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof NewPasswordSchema>) => {
    setLoading(true);
    startTransition(() => {
      newPassword(data, token).then((res) => {
        if (res?.error) {
          toast({
            variant: "destructive",
            description: res?.error,
          });
          setLoading(false);
          router.push("/authentication");
          return;
        }
        if (res?.success) {
          toast({
            variant: "default",
            description: res?.success,
          });
          setLoading(false);
          return;
        }
      });
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input placeholder="******" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="link" size="sm" className="px-2 font-normal">
          <Link href="/authentication">Go back to login.</Link>
        </Button>
        <div className="flex justify-center">
          <Button disabled={loading} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewPasswordForm;
