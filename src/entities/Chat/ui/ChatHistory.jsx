import { Box, CircularProgress, Stack } from '@mui/material';
import { useMessages } from 'entities/Chat';
import MessagesList from './MessagesList';

const ChatHistory = ({ id, ...props }) => {
	const {
		data: messages,
		isLoading: isMessagesLoading,
		isError: isMessagesError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useMessages(id);

	if (isMessagesLoading) {
		return (
			<Stack
				flexGrow={1}
				justifyContent="center"
				alignItems="center"
			>
				<CircularProgress />
			</Stack>
		);
	}

	if (isMessagesError) {
		return (
			<Stack
				flexGrow={1}
				justifyContent="center"
				alignItems="center"
			>
				<Box>Ошибка при загрузке чата</Box>
			</Stack>
		);
	}

	return (
		<MessagesList
			messages={messages}
			isFetchingNextPage={isFetchingNextPage}
			fetchNextPage={fetchNextPage}
			hasNextPage={hasNextPage}
			{...props}
		/>
	);
};

export default ChatHistory;
