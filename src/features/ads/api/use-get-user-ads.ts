import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useGetUserAds = () => {
  const query = useQuery({
    queryKey: ["userAds"],
    queryFn: async () => {
      const response = await client.api.ad.user.$get();

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }

      const data = await response.json();
      return data;
    },
  });

  return query;
};
