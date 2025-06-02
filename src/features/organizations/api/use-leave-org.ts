import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { useId } from "react";

import { authClient } from "@/lib/auth-client";

export const useLeaveOrg = () => {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async (values: { email: string }) => {
      const { data, error } = await authClient.organization.removeMember({
        memberIdOrEmail: values.email
      });

      if (error) throw new Error(error.message);

      return data;
    },
    onMutate: () => {
      toast.loading("Leaving organization...", { id: toastId });
    },
    onSuccess: () => {
      toast.success("Left from organization successfully !", { id: toastId });
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to leave organization", {
        id: toastId
      });
    }
  });

  return mutation;
};
