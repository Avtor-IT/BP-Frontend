import { Grid } from '@mui/system';
import { Chat } from 'entities/Chat';

const ChatPage = () => {
	return (
		<Grid
			container
			columns={7}
			sx={{ height: '100%' }}
		>
			<Grid size={5}>
				<Chat width="100%" />
			</Grid>
		</Grid>
	);
};

export default ChatPage;
