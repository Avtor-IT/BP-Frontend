import {
	Avatar,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Skeleton,
	Stack,
	Typography,
} from '@mui/material';
import { useMessagesCount } from 'entities/Chat';
import { useDepartmentById } from 'entities/Department';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatTimestampToShortDate } from 'shared/lib';

export const ChatItem = ({ chat }) => {
	const lastMessage = chat.last_message;
	const from = lastMessage?.sender_type;
	const isRead = lastMessage?.read;

	const chatType = chat.department_id ? 'b24' : 'manager';
	const {
		data: department,
		isLoading,
		isError,
	} = useDepartmentById(chat.department_id);

	const chatName = useMemo(() => {
		if (chatType === 'manager') return 'Менеджер';

		if (isLoading)
			return (
				<Skeleton
					variant="text"
					width="200px"
				/>
			);
		if (isError) return 'Ошибка при получении названия чата';
		return department?.result?.name;
	}, [department]);

	const { data } = useMessagesCount({
		sender_type: chatType,
		chat_id: chat.id,
		read: false,
	});

	console.log(lastMessage);

	return (
		<ListItemButton
			sx={{
				paddingBlock: 3,
				paddingInline: 2,
				'&:hover': {
					backgroundColor: 'background.primaryshade',
				},
			}}
			to={
				chat.department_id
					? 'department/' + String(chat.department_id)
					: 'manager/' + String(chat.manager_id)
			}
			disableRipple={true}
			component={Link}
		>
			<ListItemAvatar
				sx={{
					width: '64px',
					height: '64px',
					marginRight: 3,
				}}
			>
				<Avatar sx={{ width: '100%', height: '100%' }} />
			</ListItemAvatar>
			<ListItemText
				slotProps={{
					root: {
						sx: {
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
							marginBlock: 0,
						},
					},
					primary: {
						variant: 'M24',
					},
					secondary: {
						textOverflow: 'ellipsis',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
						display: 'block',
						maxWidth: '920px',
						variant: 'R16',
						color: lastMessage
							? 'textPrimary.dark'
							: 'textPrimary.default',
					},
				}}
				primary={chatName}
				secondary={
					lastMessage ? (
						<>
							{lastMessage.sender_type === 'user' && (
								<Typography
									variant="R16"
									color="tertiary.main"
								>
									Вы:
								</Typography>
							)}{' '}
							{lastMessage.content && (
								<Typography variant="R16">
									{lastMessage.content}
								</Typography>
							)}{' '}
							{!!lastMessage.attached_ids.length && (
								<Typography
									variant="R16"
									color="tertiary.main"
								>
									[вложения]
								</Typography>
							)}
						</>
					) : (
						'Нет сообщений'
					)
				}
			/>

			<Stack
				alignItems="end"
				justifyContent="end"
				gap={2}
				marginBottom="auto"
			>
				<Stack
					direction="row"
					gap={2}
				>
					{from === 'user' && !isRead ? (
						lastMessage.read ? null : (
							<Typography
								variant="R16"
								color="textSecondary.default"
							>
								Не прочитано
							</Typography>
						)
					) : null}

					{lastMessage && (
						<Typography
							variant="R16"
							color="textPrimary.dark"
						>
							{formatTimestampToShortDate(lastMessage.timestamp)}
						</Typography>
					)}
				</Stack>

				{from === 'b24' && !isRead && Boolean(data?.count) && (
					<Typography
						variant="R16"
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							width: '32px',
							height: '32px',
							backgroundColor: 'blue.main',
							color: 'primary.contrastText',
							borderRadius: '50%',
						}}
					>
						{data.count}
					</Typography>
				)}
			</Stack>
		</ListItemButton>
	);
};
