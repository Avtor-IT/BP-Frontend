import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

export const KEY = apiEndpoints.CHAT_LIST;
const getChatList = () => {
	return api.Get(apiEndpoints.CHAT_LIST);
};

const useChatList = () =>
	useQuery({
		queryFn: getChatList,
		queryKey: [KEY],
		staleTime: Infinity,
	});

export default useChatList;
