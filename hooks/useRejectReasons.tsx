import { useQuery } from '@tanstack/react-query';
import { VeriTaskQueries, RejectReasons } from './types';
import { BASE_URL } from './constants';

type UseRejectReasonsQueryKey = [VeriTaskQueries.RejectReasons];

export function useRejectReasons() {
    return useQuery<RejectReasons[], Error, RejectReasons[], UseRejectReasonsQueryKey>({
        queryKey: [VeriTaskQueries.RejectReasons],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/reject-reasons`);
            const data = await response.json();
            return data.data;
        },
        staleTime: 5,
    });
}
