import { toast } from "sonner";
import { useId } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { CreateAdSchema } from "@/server/routes/ad/ad.schemas";

interface UpdateAdParams {
  id: string;
  values: CreateAdSchema;
}

export function useUpdateAd() {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async ({ id, values }: UpdateAdParams) => {
      // Fix: Use PUT instead of PATCH to match the route configuration
      // Your ad.routes.ts defines update with "method: "put"" not "patch"
      const res = await client.api.ad[":id"].$put({
        param: { id },
        json: values,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update ad");
      }

      return await res.json();
    },
    onMutate: () => {
      toast.loading("Updating Ad...", { id: toastId });
    },
    onSuccess: (data) => {
      toast.success("Ad updated successfully", { id: toastId });
      queryClient.invalidateQueries({ queryKey: ["ads"] });
      // This should match how your useGetAdById hook is structured
      queryClient.invalidateQueries({ queryKey: ["ad", data.id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update ad", { id: toastId });
    },
  });

  return mutation;
}
