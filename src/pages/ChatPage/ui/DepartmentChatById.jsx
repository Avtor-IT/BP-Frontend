import { useDepartmentChat } from 'entities/Chat';
import { ChatItem } from './ChatItem';
import { Skeleton, Typography } from '@mui/material';

export const DepartmentChatById = ({ id }) => {
	const { data: chat, isPending, isError } = useDepartmentChat(id);

	if (isPending) {
		return (
			<Skeleton
				variant="rounded"
				height="112px"
				sx={{ marginBlock: 3 }}
			/>
		);
	}

	if (isError) {
		return <Typography variant="R20">Ошибка при загрузке чата</Typography>;
	}

	return <ChatItem chat={chat} />;
};
