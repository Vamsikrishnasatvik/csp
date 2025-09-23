"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export function RegistrationForm() {
  const router = useRouter();

  // Make sure useForm is only initialized on the client
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    router.push("/dashboard");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Fill in your details to create an account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {["name", "email", "password"].map((fieldName) => (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName as keyof typeof formSchema["_type"]}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldName === "name" ? "Full Name" : fieldName === "email" ? "Email" : "Password"}</FormLabel>
                    <FormControl>
                      <Input
                        type={fieldName === "password" ? "password" : "text"}
                        placeholder={
                          fieldName === "name"
                            ? "Your full name"
                            : fieldName === "email"
                            ? "name@example.com"
                            : "••••••••"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </Form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/" className="underline underline-offset-4 hover:text-primary">
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
