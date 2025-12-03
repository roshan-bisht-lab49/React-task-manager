import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HandleOnSuccess, VeriTaskMutations, VeriTaskQueries } from './types';
import { BASE_URL } from './constants';

export interface UseUpdateDealParams {
    status: "Approved" | "Rejected";
    reason: string | undefined;
    approverId: string | undefined;
    dealId: string
}

export function useUpdateDeal(handleOnSuccess: HandleOnSuccess) {
    const queryClient = useQueryClient();
    return useMutation<string, Error, UseUpdateDealParams, VeriTaskMutations.UpdateDeal>({
        mutationKey: [VeriTaskMutations.UpdateDeal],
        mutationFn: async (params: UseUpdateDealParams) => {
            await fetch(`${BASE_URL}/deals/${params.dealId}`, {
                method: 'PATCH',
                body: JSON.stringify({ approverId: params.approverId, status: params.status, reason: params.reason }),
            });
            return 'success';
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [VeriTaskQueries.Deals] });
            handleOnSuccess();
        },
        onError: (error) => {
            console.log('Error in Updating a Deal', error);
        },
    });
}
