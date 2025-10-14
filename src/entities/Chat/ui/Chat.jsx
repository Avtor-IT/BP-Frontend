import { Box, Stack } from '@mui/material';
import ChatHistory from './ChatHistory';
import SendMessageForm from './SendMessageForm';

const Chat = ({ roomId, ...props }) => {
	return (
		<Box
			height="100%"
			paddingBottom={4}
			{...props}
		>
			<Stack
				height="100%"
				justifyContent="end"
				gap={2}
				maxHeight="100%"
			>
				<ChatHistory id={roomId} />

				<SendMessageForm roomId={roomId} />
			</Stack>
		</Box>
	);
};

export default Chat;
