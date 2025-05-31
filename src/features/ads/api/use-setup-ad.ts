import { toast } from "sonner";
import { useId } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { CreateAdSchema } from "@/server/routes/ad/ad.schemas";

interface MutationParams {
  values: CreateAdSchema;
}

export function useSetupAd() {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async ({ values }: MutationParams) => {
      const res = await client.api.ad.$post({
        json: values
      });

      if (!res.ok) {
        const error = await res.json();

        throw new Error(error.message || "Failed to create ad");
      }

      const data = await res.json();

      return data;
    },
    onMutate: () => {
      toast.loading("Creating Ad...", { id: toastId });
    },
    onSuccess: () => {
      toast.success("Ad created successfully", { id: toastId });
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create ad", {
        id: toastId
      });
    }
  });

  return mutation;
}
