import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

export const useChatWS = ({ roomId, onopen, onmessage, onerror, onclose }) => {
	const connection = useRef(false);

	return useQuery({
		queryFn: async () => {
			if (connection.current) return;

			const socket = await api.WebSocket(apiEndpoints.ROOM_WEBSOCKET, {
				urlParams: { chat_id: roomId },
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

			connection.current = true;

			return socket;
		},
		queryKey: [apiEndpoints.ROOM_WEBSOCKET + roomId],
		staleTime: Infinity,
		retry: false,
	});
};
