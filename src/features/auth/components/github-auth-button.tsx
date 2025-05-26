"use client";

import React, { useId, useTransition } from "react";
import { toast } from "sonner";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

type Props = {
  mode: "login" | "signup";
  className?: string;
};

export function GithubAuthButton({ mode = "login", className }: Props) {
  const [isPending, startSigninAction] = useTransition();
  const toastId = useId();

  const handleSocialSignin = () => {
    startSigninAction(async () => {
      await authClient.signIn.social(
        {
          provider: "github"
        },
        {
          onRequest: () => {
            toast.loading("Signing in...", { id: toastId, description: "" });
          },
          // onSuccess: () => {
          //   toast.success("Signed in successfully", { id: toastId });
          //   router.push("/dashboard");
          //   router.refresh();
          // },
          onError: (ctx) => {
            toast.error(ctx.error.message, { id: toastId });
          }
        }
      );
    });
  };

  return (
    <Button
      onClick={handleSocialSignin}
      className={cn("flex items-center gap-2", className)}
      variant={"outline"}
      icon={<FaGithub className="size-3" />}
      loading={isPending}
    >
      {mode === "login" ? "Sign in" : "Sign up"} with Github
    </Button>
  );
}
