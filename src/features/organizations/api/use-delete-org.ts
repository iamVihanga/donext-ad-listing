import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { useId } from "react";

import { authClient } from "@/lib/auth-client";
import { OrganizationT } from "../components/organizations-table/columns";

export const useDeleteOrg = () => {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async (org: OrganizationT) => {
      const { data, error } = await authClient.organization.delete({
        organizationId: org.id
      });

      if (error) throw new Error(error.message);

      return data;
    },
    onMutate: () => {
      toast.loading("Deleting organization...", { id: toastId });
    },
    onSuccess: () => {
      toast.success("Organization deleted successfully !", { id: toastId });
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete organization", {
        id: toastId
      });
    }
  });

  return mutation;
};
