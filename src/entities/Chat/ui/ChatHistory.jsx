import { Box, CircularProgress, Stack } from '@mui/material';
import { useMessages } from 'entities/Chat';
import MessagesList from './MessagesList';
import { useNavigate } from 'react-router';
import { AppRoutes, RoutePath } from 'shared/router';
import { useEffect } from 'react';

const ChatHistory = ({ id, ...props }) => {
	const {
		data: messages,
		isLoading: isMessagesLoading,
		isError: isMessagesError,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useMessages(id);

	const navigate = useNavigate();
	useEffect(() => {
		if (error?.status === 404) {
			navigate(RoutePath[AppRoutes.CHATS], { replace: true });
		}
	}, [error, navigate]);

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
