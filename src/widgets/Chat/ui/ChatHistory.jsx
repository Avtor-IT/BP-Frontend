import { Box, CircularProgress, List, ListItemText } from '@mui/material';
import { useMessages } from 'entities/Chat';

const ChatHistory = ({ id, ...props }) => {
	const {
		data: messages,
		isLoading: isMessagesLoading,
		isError: isMessagesError,
	} = useMessages(id);

	if (isMessagesLoading) {
		return <CircularProgress />;
	}
	if (isMessagesError) {
		return <Box>Ошибка при загрузке чата</Box>;
	}

	return (
		<List {...props}>
			{messages.map((message) => (
				<ListItemText
					key={message.id}
					primary={message.content}
					secondary={new Date(message.timestamp).toLocaleString()}
					sx={{
						textAlign:
							message.sender_type === 'user' ? 'right' : 'left',
					}}
				/>
			))}
		</List>
	);
};

export default ChatHistory;
