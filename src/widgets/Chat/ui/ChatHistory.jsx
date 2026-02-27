import { Box, CircularProgress, Stack } from '@mui/material';
import { useMessages } from 'entities/Chat';
import { useReadMessageOnVisible } from 'features/Chat';
import MessageList from './MessageList';
import { useNavigate } from 'react-router';
import { AppRoutes, RoutePath } from 'shared/router';
import { useEffect, useMemo } from 'react';

const ChatHistory = ({ chatId, type, ...props }) => {
	const {
		data: messages,
		isError: isMessagesError,
		isPending,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useMessages(chatId, type);

	const messageList = useMemo(() => {
		if (!messages) {
			return undefined;
		}
		return messages.pages.flatMap((page) => page.results).reverse();
	}, [messages]);

	const handleMessageVisibility = useReadMessageOnVisible(chatId, type);

	const navigate = useNavigate();
	useEffect(() => {
		if (error?.status === 404) {
			navigate(RoutePath[AppRoutes.CHATS], { replace: true });
		}
	}, [error, navigate]);

	if (isPending) {
		return (
			<Stack
				height="100%"
				justifyContent="center"
				alignItems="center"
			>
				<CircularProgress
					size={70}
					color="secondary"
				/>
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
				<Box>Ошибка загрузки сообщений</Box>
			</Stack>
		);
	}

	return (
		<MessageList
			messages={messageList}
			isFetchingNextPage={isFetchingNextPage}
			fetchNextPage={fetchNextPage}
			hasNextPage={hasNextPage}
			onMessageVisible={handleMessageVisibility}
			{...props}
		/>
	);
};

export default ChatHistory;
