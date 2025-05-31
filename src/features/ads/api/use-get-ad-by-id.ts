import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface Params {
  adId: string;
}

export const useGetAdById = (params: Params) => {
  const { adId } = params;

  const query = useQuery({
    queryKey: ["ads", { adId }],
    queryFn: async () => {
      const response = await client.api.ad[":id"].$get({
        param: { id: adId }
      });

      if (!response.ok) {
        const { message } = await response.json();

        throw new Error(message);
      }

      const data = await response.json();

      return data;
    }
  });

  return query;
};
