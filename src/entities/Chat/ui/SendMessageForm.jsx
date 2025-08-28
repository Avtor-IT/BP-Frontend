import { useQueryClient } from '@tanstack/react-query';
import { useUser } from 'entities/User';
import { useState } from 'react';
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
								id: page.results[0].id + 1,
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

	const {
		data: user,
		isLoading: _isUserLoading,
		isError: _isUserError,
	} = useUser();

	const onMessageHandler = (e) => {
		const msg = JSON.parse(e.data);

		queryClient.setQueryData(
			[apiEndpoints.CHAT_MESSAGES, roomId],
			(oldData) => updateMessages(oldData, msg)
		);
	};

	const {
		data: socket,
		isLoading,
		isError: _,
	} = useChatWS({ roomId, onmessage: onMessageHandler });

	const sendMessage = (e) => {
		e.preventDefault();

		const msg = {
			message,
			contactId: user.contactId,
		};

		socket.send(JSON.stringify(msg));
		setMessage('');
	};

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
					placeholder="Сообщение"
					disabled={isLoading}
				/>
				<Button
					type="submit"
					variant="contained"
					disabled={isLoading || !message}
				>
					Отправить
				</Button>
			</Stack>
		</form>
	);
};

export default SendMessageForm;
