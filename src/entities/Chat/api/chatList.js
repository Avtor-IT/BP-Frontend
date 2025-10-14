import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

const getChatList = () => {
	return api.Get(apiEndpoints.CHAT_LIST);
};

const useChatList = () =>
	useQuery({
		queryFn: getChatList,
		queryKey: [apiEndpoints.CHAT_LIST],
		staleTime: Infinity,
	});

export default useChatList;
