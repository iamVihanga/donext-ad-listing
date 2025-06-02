import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface FilterParams {
  page?: number;
  limit?: number;
  search?: string | null;
}

export const useGetAds = (params: FilterParams) => {
  const { page = 1, limit = 10, search = "" } = params;

  const query = useQuery({
    queryKey: ["ads", { page, limit, search }],
    queryFn: async () => {
      const queryParams = {
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search })
      };

      const response = await client.api.ad.$get({
        query: queryParams
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
