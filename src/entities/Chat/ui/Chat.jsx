import {
	Box,
	Button,
	CircularProgress,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from 'entities/User';
import { useState } from 'react';
import { useParams } from 'react-router';
import ChatHistory from './ChatHistory';
import { useChatWS } from '../api/chatWebSocket';
import { apiEndpoints } from 'shared/model';

const Chat = ({ ...props }) => {
	const { id } = useParams();
	const queryClient = useQueryClient();
	const [message, setMessage] = useState('');

	const { data: user, isLoading, isError } = useUser();

	// @TODO: optimistic updates
	const invalidateChatMessages = () => {
		queryClient.invalidateQueries([apiEndpoints.CHAT_MESSAGES, id]);
	};

	const {
		data: socket,
		isLoading: isChatLoading,
		isError: isChatError,
	} = useChatWS({
		id,
		onmessage: invalidateChatMessages,
	});

	const handleMessageChange = (event) => {
		setMessage(event.target.value);
	};

	const sendMessage = (e) => {
		e.preventDefault();

		const msg = {
			message,
			contactId: user.contactId,
		};

		socket.send(JSON.stringify(msg));
		setMessage('');
	};

	if (isLoading || isChatLoading) {
		<Stack
			height="100%"
			paddingBottom={4}
			justifyContent="center"
			alignItems="center"
			{...props}
		>
			<CircularProgress />
		</Stack>;
	}

	if (isError || isChatError) {
		<Stack
			height="100%"
			paddingBottom={4}
			justifyContent="center"
			alignItems="center"
			{...props}
		>
			<Typography
				variant="M20"
				color="error"
			>
				Ошибка при подключении к комнате
			</Typography>
		</Stack>;
	}

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
				maxHeight="100%"
			>
				<ChatHistory id={id} />

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
