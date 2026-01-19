import { Box, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import ChatHistory from './ChatHistory';
import SendMessageForm from './SendMessageForm';
import { useDepartmentChat } from '../api/getDepartmentChat';
import { CloseIcon } from 'shared/icons/Close';
import { Link } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/router';

const Chat = ({ roomId, type, ...props }) => {
	const { data: chat, isLoading, isError } = useDepartmentChat(roomId);

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
			<Stack height="100%">
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
				>
					<ChatHistory
						id={chat.id}
						listHeight={'600px'}
					/>

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
