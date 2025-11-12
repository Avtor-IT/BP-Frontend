import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

const KEY = apiEndpoints.MANAGER_CHAT;

const managerChat = () => {
	return api.Get(apiEndpoints.MANAGER_CHAT);
};

export const useManagerChat = () =>
	useQuery({
		queryKey: [KEY],
		queryFn: managerChat,
		staleTime: Infinity,
	});
