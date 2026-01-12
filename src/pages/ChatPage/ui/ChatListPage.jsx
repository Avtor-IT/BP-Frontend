import {
	Avatar,
	List,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Skeleton,
	Stack,
	Typography,
} from '@mui/material';
import { useChatList } from 'entities/Chat';
import { useUserServices } from 'entities/Service';
import { Link } from 'react-router-dom';
import { formatTimestampToShortDate } from 'shared/lib';

const ChatListPage = () => {
	const { data: chatList, isLoading, isError } = useChatList();

	/* Получать чаты по подключённым услугам и отдельно по менеджеру. Отображаться должны чаты только с подключённых услуг */
	// const { data: servicesList } = useUserServices();

	if (isLoading) {
		return (
			<Stack gap={2}>
				{Array.from({ length: 5 }).map((_, i) => (
					<Skeleton
						key={i}
						height="118px"
						variant="rounded"
					/>
				))}
			</Stack>
		);
	}

	if (isError) {
		return <Typography variant="M20">Ошибка при загрузке чатов</Typography>;
	}

	return (
		<List>
			{chatList.map((chat) => {
				const lastMessage = chat.last_message;
				const from = lastMessage?.sender_type;
				const isRead = lastMessage?.read;

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
							chat.manager_id
								? 'manager/' + String(chat.manager_id)
								: 'department/' + String(chat.department_id)
						}
						disableRipple={true}
						component={Link}
						key={chat.id}
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
							primary={`b24 id: ${
								chat['manager_id'] || chat['department_id']
							}`}
							secondary={
								lastMessage
									? lastMessage.content
									: 'Нет сообщений'
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
										{formatTimestampToShortDate(
											lastMessage.timestamp
										)}
									</Typography>
								)}
							</Stack>

							{from === 'b24' && !isRead && (
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
								></Typography>
							)}
						</Stack>
					</ListItemButton>
				);
			})}
		</List>
	);
};

export default ChatListPage;
