"use client";

import React, { useId, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { authClient } from "@/lib/auth-client";
import {
  signinSchema,
  type SigninSchemaT
} from "@/features/auth/schemas/signin-schema";
import { cn } from "@/lib/utils";

import { GoogleAuthButton } from "./google-auth-button";
import { GithubAuthButton } from "./github-auth-button";
import { Separator } from "@/components/ui/separator";
import { PasswordInput } from "@/components/ui/password-input";

type Props = {
  className?: string;
};

export function SigninForm({ className }: Props) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const toastId = useId();

  const form = useForm<SigninSchemaT>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function handleFormSubmit(formData: SigninSchemaT) {
    setIsPending(true);

    await authClient.signIn.email(
      {
        email: formData.email,
        password: formData.password,
        callbackURL: "/dashboard"
      },
      {
        onRequest() {
          toast.loading("Signing in...", { id: toastId });
        },
        onSuccess() {
          toast.success("Successfully Signed in", { id: toastId });
        },
        onError({ error }) {
          console.log(error);
          toast.error("Sign in Failed !", {
            id: toastId,
            description: error.message
          });
        }
      }
    );

    setIsPending(false);
  }

  return (
    <div className={cn("grid gap-6", className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="john.doe@example.com"
                    {...field}
                  />
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
                  <PasswordInput
                    disabled={isPending}
                    placeholder="***********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" loading={isPending}>
            Login
          </Button>
        </form>
      </Form>

      {/* Option texts */}
      <div className="flex items-center text-center justify-between">
        <Button asChild variant={"link"} className="p-0">
          <Link href={"/signup"}>Need an account ? Sign Up</Link>
        </Button>
        <Button asChild variant={"link"} className="p-0">
          <Link href={"/forgot-password"}>Forgot Password</Link>
        </Button>
      </div>

      <Separator />

      {/* Auth Provider Buttons */}
      <div className="flex flex-col space-y-4">
        <GoogleAuthButton mode="login" />
        <GithubAuthButton mode="login" />
      </div>
    </div>
  );
}
