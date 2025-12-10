import { Box, Skeleton, Stack, Typography } from '@mui/material';
import ChatHistory from './ChatHistory';
import SendMessageForm from './SendMessageForm';
import { useDepartmentChat } from '../api/getDepartmentChat';

const Chat = ({ roomId, type, ...props }) => {
	const { data: chat, isLoading, isError } = useDepartmentChat(roomId);

	console.log(chat);

	if (isLoading)
		return (
			<Stack gap={2}>
				{Array.from({ length: 5 }).map((_, i) => (
					<Skeleton
						key={i}
						height={80}
						variant="rounded"
					/>
				))}
			</Stack>
		);

	if (isError) return <Typography variant="M24">Ошибка</Typography>;

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
				<ChatHistory id={chat.id} />

				<SendMessageForm
					roomId={chat.id}
					type={type}
				/>
			</Stack>
		</Box>
	);
};

export default Chat;
