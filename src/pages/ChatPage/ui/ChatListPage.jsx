import { List, Skeleton, Stack, Typography } from '@mui/material';
import { useDepartmentChats, useManagerChat } from 'entities/Chat';
import { ChatItem } from './ChatItem';
import { useUserServices } from 'entities/Service';
import { DepartmentChatById } from './DepartmentChatById';

const ChatListPage = () => {
	const {
		data: managerChat,
		isLoading: isManagerChatLoading,
		isError: isManagerChatError,
	} = useManagerChat();

	const { data: services } = useUserServices();
	const departmentChatsQueries = useDepartmentChats(
		services?.active_services.map((s) => s.department_id) || []
	);
	const ids = departmentChatsQueries?.map((q) => q.data?.department_id);

	if (isManagerChatLoading) {
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

	if (isManagerChatError) {
		return <Typography variant="M20">Ошибка при загрузке чатов</Typography>;
	}

	return (
		<List>
			<ChatItem chat={managerChat} />

			{ids.map(
				(id) =>
					Boolean(id) && (
						<DepartmentChatById
							id={id}
							key={id}
						/>
					)
			)}
		</List>
	);
};

export default ChatListPage;
