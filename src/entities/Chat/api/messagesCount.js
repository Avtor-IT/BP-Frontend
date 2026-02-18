import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

export const KEY = apiEndpoints.MESSAGES_COUNT;

const getMessagesCount = async (params) => {
	return await api.Get(apiEndpoints.MESSAGES_COUNT, { params });
};

export const useMessagesCount = (params) =>
	useQuery({
		queryKey: [KEY, params],
		queryFn: async () => await getMessagesCount(params),
		staleTime: Infinity,
	});
