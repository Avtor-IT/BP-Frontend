import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

export const MESSAGES_KEY = apiEndpoints.CHAT_MESSAGES;

const getMessages = async (chat_room_id, page = 1, page_size = 10) => {
	return await api.Get(apiEndpoints.CHAT_MESSAGES, {
		params: { page, page_size },
		urlParams: { chat_room_id },
	});
};

const useMessages = (chat_room_id) =>
	useInfiniteQuery({
		queryKey: [MESSAGES_KEY, chat_room_id],
		queryFn: ({ pageParam }) => getMessages(chat_room_id, pageParam),
		getNextPageParam: (lastpage) => lastpage.next_page,
		retry: false,
		staleTime: Infinity,
	});

export default useMessages;
