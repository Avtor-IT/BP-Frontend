import { Box, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import ChatHistory from './ChatHistory';
import { SendMessageForm } from 'features/Chat';
import { CHAT_TYPE, useDepartmentChat, useManagerChat } from 'entities/Chat';
import { CloseIcon } from 'shared/icons/Close';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/router';
import { useDepartmentById } from 'entities/Department';

const Chat = ({ roomId, type, ...props }) => {
	const navigate = useNavigate();
	const {
		data: chat,
		isLoading,
		isError,
	} = type === CHAT_TYPE.DEPARTMENT
		? useDepartmentChat(roomId)
		: useManagerChat();

	const {
		data: department,
		isLoading: isDepartmentLoading,
		isError: isDepartmentError,
	} = useDepartmentById(chat?.department_id);

	const chatName = useMemo(() => {
		if (type === CHAT_TYPE.MANAGER) return 'Менеджер';

		if (isDepartmentLoading)
			return (
				<Skeleton
					variant="text"
					width="200px"
				/>
			);
		if (isDepartmentError) return 'Ошибка при получении названия чата';
		return department?.result?.name;
	}, [department]);

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				navigate(RoutePath[AppRoutes.CHATS]);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [navigate]);

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

	if (isError)
		return <Typography variant="M24">Ошибка загрузки чата</Typography>;

	return (
		<Box
			height="100%"
			minHeight={0}
			maxHeight="1200px"
			paddingBottom={4}
			{...props}
		>
			<Stack
				height="100%"
				minHeight={0}
			>
				<Stack
					direction="row"
					backgroundColor="secondary.main"
					alignItems="center"
					color="secondary.contrastText"
					justifyContent="space-between"
					paddingInline={3}
					paddingBlock={4}
					borderRadius={4}
				>
					<Typography variant="M24">{chatName}</Typography>
					<IconButton
						sx={{ color: 'secondary.contrastText' }}
						component={Link}
						to={RoutePath[AppRoutes.CHATS]}
					>
						<CloseIcon />
					</IconButton>
				</Stack>

				<Stack
					flexGrow={1}
					justifyContent="start"
					maxHeight="100%"
					minHeight={0}
				>
					<Box
						flexGrow={1}
						minHeight={0}
					>
						<ChatHistory
							chatId={chat.id}
							type={type}
						/>
					</Box>

					<SendMessageForm
						roomId={chat.id}
						type={type}
					/>
				</Stack>
			</Stack>
		</Box>
	);
};

export default Chat;
