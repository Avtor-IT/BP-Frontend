import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

export const MANAGER_CHAT_KEY = apiEndpoints.MANAGER_CHAT;

const managerChat = () => {
	return api.Get(apiEndpoints.MANAGER_CHAT);
};

export const useManagerChat = () =>
	useQuery({
		queryKey: [MANAGER_CHAT_KEY],
		queryFn: managerChat,
		staleTime: Infinity,
	});
