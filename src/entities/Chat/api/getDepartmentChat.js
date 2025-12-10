import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

const KEY = apiEndpoints.DEPARTMENT_CHAT;

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
		queryKey: [KEY],
	});
