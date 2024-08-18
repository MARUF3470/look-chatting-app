"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";

const FormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(100),
  email: z.string().min(11, {
    message: "Email must be at least 11 characters.",
  }),
  password: z
    .string()
    .min(1, {
      message: "Password is requied.",
    })
    .min(6, {
      message: "Password must be at least 6 characters.",
    }),
  cpassword: z.string().min(1, {
    message: "Retype your password.",
  }),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Image size should be less than 5MB.",
    })
    .optional(), // Make image optional in the schema
});

const RegistrationForm = () => {
  const { toast } = useToast();
  const [accept, setAccepted] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setloading(true);
    if (data?.password !== data?.cpassword) {
      toast({
        variant: "destructive",
        description: "Your password and confirm password doesn't match.",
      });
    }
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.image) {
      formData.append("image", data.image);
    }

    try {
      const data = await fetch("/api/user", {
        method: "POST",
        body: formData,
      });
      const result = await data.json();

      if (result.status === 200) {
        setloading(false);
        return toast({
          variant: "default",
          description: result.message,
        });
      } else {
        setloading(false);
        return toast({
          variant: "destructive",
          description: result.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" type="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="cpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="items-top flex space-x-2">
          <Checkbox id="terms1" onClick={() => setAccepted(!accept)} />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
            <p className="text-sm text-muted-foreground">
              You agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Button disabled={!accept || loading} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegistrationForm;
