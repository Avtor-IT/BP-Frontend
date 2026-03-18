import { useQueries, useQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

export const DEPARTMENT_CHAT_KEY = apiEndpoints.DEPARTMENT_CHAT;

const getDepartmentChat = async (id) => {
	return await api.Get(apiEndpoints.DEPARTMENT_CHAT, {
		urlParams: {
			department_id: id,
		},
	});
};

export const useDepartmentChat = (id) =>
	useQuery({
		queryFn: async () => await getDepartmentChat(id),
		queryKey: [DEPARTMENT_CHAT_KEY, id],
		staleTime: Infinity,
		enabled: Boolean(id),
	});

export const useDepartmentChats = (ids) =>
	useQueries({
		queries: ids.map((id) => ({
			queryFn: async () => await getDepartmentChat(id),
			queryKey: [DEPARTMENT_CHAT_KEY, id],
			staleTime: Infinity,
		})),
	});
