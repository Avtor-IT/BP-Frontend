import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

const getMessages = async (chat_room_id, page = 1) => {
	return await api.Get(apiEndpoints.CHAT_MESSAGES, {
		params: { page },
		urlParams: { chat_room_id },
	});
};

const useMessages = (chat_room_id) =>
	useInfiniteQuery({
		queryKey: [apiEndpoints.CHAT_MESSAGES, chat_room_id],
		queryFn: ({ pageParam }) => getMessages(chat_room_id, pageParam),
		getNextPageParam: (lastpage) => lastpage.next_page,
	});

export default useMessages;
