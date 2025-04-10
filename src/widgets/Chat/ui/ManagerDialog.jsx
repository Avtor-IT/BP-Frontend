import { ListItemButton, ListItemText, Skeleton } from '@mui/material';
import { useRoom } from 'entities/Chat';
import { useManager } from 'entities/Manager';
import { Link } from 'react-router-dom';

const ManagerDialog = () => {
	const {
		data: manager,
		isLoading: isManagerLoading,
		isError: isManagerError,
	} = useManager();

	const {
		data: room,
		isLoading: isRoomLoading,
		isError: isRoomError,
	} = useRoom(manager?.ID);

	if (isManagerLoading || isRoomLoading) {
		return (
			<ListItemButton disabled>
				<Skeleton
					width="100%"
					height="48px"
				/>
			</ListItemButton>
		);
	}
	if (isManagerError || isRoomError) {
		return (
			<ListItemButton disabled>
				<ListItemText primary="Ошибка при загрузке чата" />
			</ListItemButton>
		);
	}

	return (
		<Link
			to={`/chat/${room.id}`}
			component={ListItemButton}
		>
			<ListItemText
				primary={`${manager.LAST_NAME} ${manager.NAME}`}
				secondary={'менеджер'}
			/>
		</Link>
	);
};

export default ManagerDialog;
