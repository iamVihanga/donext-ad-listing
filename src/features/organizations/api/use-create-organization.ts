import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useId } from "react";

import { authClient } from "@/lib/auth-client";
import { CreateOrgSchema } from "../schemas/create-org.schema";
import { toKebabCase } from "@/lib/utils";

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async (values: CreateOrgSchema) => {
      const { data, error } = await authClient.organization.create({
        name: values.name,
        slug: toKebabCase(values.name),
        logo: values.logo || undefined,
        metadata: {
          description: values.description
        }
      });

      if (error) throw new Error(error.message);

      return data;
    },
    onMutate: () => {
      toast.loading("Creating new organization...", { id: toastId });
    },
    onSuccess: () => {
      toast.success("Organization created successfully !", { id: toastId });
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create organization", {
        id: toastId
      });
    }
  });

  return mutation;
};
