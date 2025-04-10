import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

const getRoom = async (b24_user_id) => {
	return await api.Get(apiEndpoints.CHAT_ROOM, {
		urlParams: { b24_user_id },
	});
};

const useRoom = (b24_user_id) =>
	useQuery({
		queryKey: ['chat', b24_user_id],
		queryFn: () => getRoom(b24_user_id),
		staleTime: Infinity,
		enabled: Boolean(b24_user_id),
		retry: false,
	});

export default useRoom;
