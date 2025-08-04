import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

export const useChatWS = ({ id, onopen, onmessage, onerror, onclose }) =>
	useQuery({
		queryFn: async () => {
			const socket = await api.WebSocket(apiEndpoints.ROOM_WEBSOCKET, {
				urlParams: { chat_id: id },
			});
			socket.onopen = () => {
				if (onopen) onopen();
			};
			socket.onmessage = (event) => {
				if (onmessage) onmessage(event);
			};
			socket.onerror = (error) => {
				console.error('WebSocket error:', error);
				if (onerror) onerror(error);
			};
			socket.onclose = () => {
				if (onclose) onclose();
			};

			return socket;
		},
		queryKey: ['websocket chat ' + id],
	});
