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
import { ResetSchema } from "@/schemas/schema";
import { startTransition, useState } from "react";
import { reset } from "@/app/utils/passwordReset";

const ResetForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof ResetSchema>) => {
    console.log(data);
    setLoading(true);
    startTransition(() => {
      reset(data).then((res) => {
        if (res?.error) {
          setLoading(false);
          return toast({
            variant: "destructive",
            description: res?.error,
          });
        }
        if (res?.success) {
          setLoading(false);
          return toast({
            variant: "default",
            description: res?.success,
          });
        }
      });
    });
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

export default ResetForm;
