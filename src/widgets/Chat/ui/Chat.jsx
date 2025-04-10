import { Box, Button, Stack, TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useChatWebSocket } from 'entities/Chat';
import { useUser } from 'entities/User';
import { useState } from 'react';
import { useParams } from 'react-router';
import ChatHistory from './ChatHistory';

const Chat = ({ ...props }) => {
	const { id } = useParams();
	const queryClient = useQueryClient();
	const [message, setMessage] = useState('');

	const { data: user, isLoading, isError } = useUser();

	const socket = useChatWebSocket({
		id,
		onmessage: () => {
			queryClient.invalidateQueries({ queryKey: ['messages', id] });
		},
	});

	const handleMessageChange = (event) => {
		setMessage(event.target.value);
	};

	const sendMessage = (e) => {
		e.preventDefault();

		const msg = {
			message,
			sender_type: 'user',
			contactId: user.contactId,
		};

		socket.send(JSON.stringify(msg));
		setMessage('');
	};

	return (
		<Box
			height="100%"
			paddingBottom={4}
			{...props}
		>
			<Stack
				height="100%"
				justifyContent="end"
				gap={2}
			>
				<Box
					position={'relative'}
					width="100%"
					flexGrow={1}
					overflow="hidden"
				>
					<ChatHistory
						id={id}
						sx={{
							overflowY: 'auto',
							position: 'absolute',
							height: '100%',
							width: '100%',
							paddingInline: 2,
						}}
					/>
				</Box>

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
						/>
						<Button
							type="submit"
							variant="contained"
							disabled={isLoading || isError || !message}
						>
							Отправить
						</Button>
					</Stack>
				</form>
			</Stack>
		</Box>
	);
};

export default Chat;
