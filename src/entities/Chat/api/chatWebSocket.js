import { useMemo } from 'react';

const useChatWebSocket = ({ id, onopen, onmessage, onerror, onclose }) => {
	const websocket = useMemo(() => {
		const socket = new WebSocket(`ws://5.35.82.235/ws/chat/${id}/`);
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
	}, [id]);

	return websocket;
};

export default useChatWebSocket;
