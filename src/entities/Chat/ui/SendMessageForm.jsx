import { useQueryClient } from '@tanstack/react-query';
import { useUser } from 'entities/User';
import { useEffect, useRef, useState } from 'react';
import { apiEndpoints } from 'shared/model';
import { useChatWS } from '../api/chatWebSocket';
import { Button, Stack, TextField } from '@mui/material';

const updateMessages = (oldData, msg) => {
	if (!oldData) return oldData;

	return {
		...oldData,
		pages: oldData.pages.map((page, idx) =>
			idx === 0
				? {
						...page,
						results: [
							{
								...msg,
								content: msg.message,
								timestamp: Date.now(),
							},
							...page.results,
						],
				  }
				: page
		),
	};
};

const SendMessageForm = ({ roomId }) => {
	const queryClient = useQueryClient();

	const [message, setMessage] = useState('');
	const handleMessageChange = (event) => {
		setMessage(event.target.value);
	};
	const lastMessageRef = useRef(null);

	const {
		data: user,
		isLoading: _isUserLoading,
		isError: _isUserError,
	} = useUser();

	const {
		sendMessage: sendWSMessage,
		lastJsonMessage,
		lastMessage,
		isConnecting,
		isClosed,
	} = useChatWS({
		roomId,
	});

	const onMessageHandler = (lastJsonMessage) => {
		const msg = lastJsonMessage;

		queryClient.setQueryData(
			[apiEndpoints.CHAT_MESSAGES, roomId],
			(oldData) => updateMessages(oldData, msg)
		);
	};

	const sendMessage = (e) => {
		e.preventDefault();

		const msg = {
			message,
			sender_id: user.contactId,
		};

		sendWSMessage(JSON.stringify(msg));
		setMessage('');
	};

	useEffect(() => {
		if (lastMessage && lastMessage !== lastMessageRef.current) {
			lastMessageRef.current = lastMessage;
			onMessageHandler(lastJsonMessage);
		}
	}, [lastMessage]);

	return (
		<form onSubmit={sendMessage}>
			<Stack
				direction="row"
				gap={2}
			>
				<TextField
					value={message}
					onChange={handleMessageChange}
					fullWidth
					placeholder={isClosed ? 'Ошибка подключения' : 'Сообщение'}
					disabled={isConnecting}
				/>
				<Button
					type="submit"
					variant="contained"
					disabled={!message || isClosed || isConnecting}
				>
					Отправить
				</Button>
			</Stack>
		</form>
	);
};

export default SendMessageForm;
