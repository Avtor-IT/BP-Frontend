import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { CHAT_TYPE } from 'entities/Chat';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

export const useChatWS = ({ roomId, type = CHAT_TYPE.DEPARTMENT }) => {
	const [url, setUrl] = useState();
	const socket = useWebSocket(url, undefined, Boolean(url));

	useEffect(() => {
		(async () => {
			const wsurl = await api.getWebSocketUrl(
				apiEndpoints[`ROOM_WEBSOCKET_${type}`],
				{
					urlParams: { chat_id: roomId },
				}
			);

			setUrl(wsurl);
		})();
	}, [roomId, type]);

	return {
		...socket,
		isConnecting:
			socket.readyState === ReadyState.CONNECTING ||
			socket.readyState === ReadyState.CLOSING,
		isClosed:
			socket.readyState === ReadyState.CLOSED ||
			socket.readyState === ReadyState.UNINSTANTIATED,
	};
};
