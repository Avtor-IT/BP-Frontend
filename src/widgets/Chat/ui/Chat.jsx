import { Box, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import ChatHistory from './ChatHistory';
import { SendMessageForm } from 'features/Chat';
import { useDepartmentChat } from 'entities/Chat';
import { CloseIcon } from 'shared/icons/Close';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/router';

const Chat = ({ roomId, type, ...props }) => {
	const navigate = useNavigate();
	const { data: chat, isLoading, isError } = useDepartmentChat(roomId);

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
					<Typography variant="M24">Чат с кем?</Typography>
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
						<ChatHistory chatId={chat.id} />
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
