import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

const getMessages = async (chat_room_id) => {
	return await api.Get(apiEndpoints.CHAT_MESSAGES, {
		urlParams: { chat_room_id },
	});
};

const useMessages = (chat_room_id) =>
	useQuery({
		queryKey: [apiEndpoints.CHAT_MESSAGES, chat_room_id],
		queryFn: () => getMessages(chat_room_id),
		enabled: Boolean(chat_room_id),
	});

export default useMessages;
