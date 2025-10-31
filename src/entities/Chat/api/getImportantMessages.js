import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

export const KEY = apiEndpoints.CHAT_IMPORTANT_MESSAGES;

const getImportantMessages = async (chatRoomId, pageSize = 10) => {
	return (
		await api.Get(apiEndpoints.CHAT_IMPORTANT_MESSAGES, {
			params: { chat_room_id: chatRoomId, page_size: pageSize },
		})
	).results;
};

export const useImportantMessages = (chatRoomId, pageSize) =>
	useQuery({
		queryFn: async () => await getImportantMessages(chatRoomId, pageSize),
		queryKey: [KEY, chatRoomId, pageSize],
	});
