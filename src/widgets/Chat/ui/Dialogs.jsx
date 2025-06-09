import { List } from '@mui/material';
import { useChatList } from 'entities/Chat';
import ManagerDialog from './ManagerDialog';

const Dialogs = () => {
	const { data } = useChatList();

	return (
		<List>
			<ManagerDialog />
		</List>
	);
};

export default Dialogs;
