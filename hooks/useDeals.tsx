import { useQuery } from "@tanstack/react-query";
import { Deal, VeriTaskQueries } from "./types";
import { BASE_URL } from "./constants";

type UseDealsQueryKey = [VeriTaskQueries.Deals];

export function useDeals(userId: string | undefined) {
  return useQuery<Deal[], Error, Deal[], UseDealsQueryKey>({
    queryKey: [VeriTaskQueries.Deals],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/deals`, {
        headers: {
          userId: userId ?? ""
        }
      });
      const data = await response.json();
      return data.data;
    },
    staleTime: 2,
    enabled: !!userId
  });
}
