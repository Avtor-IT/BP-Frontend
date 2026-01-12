import { Box, CircularProgress, Stack } from '@mui/material';
import { useMessages, useReadMessage } from 'entities/Chat';
import MessageList from './MessageList2';
import { useNavigate } from 'react-router';
import { AppRoutes, RoutePath } from 'shared/router';
import { useCallback, useEffect, useMemo, useRef } from 'react';

const ChatHistory = ({ id, ...props }) => {
	const {
		data: messages,
		isLoading: isMessagesLoading,
		isError: isMessagesError,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status,
	} = useMessages(id);

	const messagesList = useMemo(() => {
		if (!messages) {
			return undefined;
		}
		return messages.pages.flatMap((page) => page.results).reverse();
	}, [messages]);

	const readMessageMutation = useReadMessage(id);
	const readMessagesRef = useRef(new Set()); // Отслеживаем уже отправленные на прочитывание сообщения

	// Функция для обработки видимости сообщения (прочтение)
	const handleMessageVisibility = useCallback(
		(message) => {
			if (
				message.sender_type === 'b24' &&
				!message.read &&
				!readMessagesRef.current.has(message.id)
			) {
				readMessageMutation.mutate(message.id);
				readMessagesRef.current.add(message.id);
			}
		},
		[readMessageMutation]
	);

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
		<MessageList
			messages={messagesList}
			isFetchingNextPage={isFetchingNextPage}
			fetchNextPage={fetchNextPage}
			hasNextPage={hasNextPage}
			onMessageVisible={handleMessageVisibility}
			status={status}
			{...props}
		/>
	);
};

export default ChatHistory;
