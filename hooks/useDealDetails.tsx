import { useQuery } from "@tanstack/react-query";
import { Deal, VeriTaskQueries } from "./types";
import { BASE_URL } from "./constants";

type UseDealsDetailsQueryKey = [VeriTaskQueries.Deals, string];

export function useDealDetails(dealId: string) {
    return useQuery<Deal, Error, Deal, UseDealsDetailsQueryKey>({
        queryKey: [VeriTaskQueries.Deals, dealId],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/deals/${dealId}`);
            const data = await response.json();
            return data.data;
        },
        staleTime: 2,
        enabled: !!dealId
    });
}
