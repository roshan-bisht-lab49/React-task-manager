import { useQuery } from '@tanstack/react-query';
import { VeriTaskQueries, UsersType, AppUsers } from './types';
import { BASE_URL } from './constants';

type UseClientsQueryKey = [VeriTaskQueries.Users];

export function useUsers(userType: UsersType = UsersType.Manager) {
    function getUsers(userList: AppUsers[]) {
        switch (userType) {
            case UsersType.All:
                return userList;
            case UsersType.Representative:
                return userList.filter((user) => user.role === 'Representative');
            case UsersType.Manager:
                return userList.filter((user) => user.role === 'Manager');
        }
    }

    return useQuery<AppUsers[], Error, AppUsers[], UseClientsQueryKey>({
        queryKey: [VeriTaskQueries.Users],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/users`);
            const data = await response.json();
            return data.data;
        },
        staleTime: 5,
        select: getUsers,
    });
}
