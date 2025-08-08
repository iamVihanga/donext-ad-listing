import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface UserAdsParams {
  page?: number;
  limit?: number;
  search?: string | null;
}

export const useGetUserAds = (params: UserAdsParams = {}) => {
  const { page = 1, limit = 10, search = "" } = params;

  const query = useQuery({
    queryKey: ["userAds", { page, limit, search }],
    queryFn: async () => {
      const queryParams = {
        page: page.toString(),
        limit: limit.toString(),
        filterByUser: true,
        ...(search && { search }),
      };

      const response = await client.api.ad.$get({
        query: queryParams,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user ads");
      }

      const data = await response.json();
      return data;
    },
    // Optional: Add better error handling and caching
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  return query;
};
