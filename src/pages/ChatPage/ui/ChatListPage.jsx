import {
	CircularProgress,
	List,
	ListItem,
	ListItemText,
	Typography,
} from '@mui/material';
import { Chat, useChatList } from 'entities/Chat';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const ChatListPage = () => {
	const { id: roomId } = useParams();
	const intId = parseInt(roomId);
	const { data: chatList, isLoading, isError } = useChatList();

	if (isLoading) {
		return <CircularProgress />;
	}

	if (isError) {
		return <Typography variant="M20">Ошибка при загрузке чатов</Typography>;
	}

	if (!intId) {
		return (
			<List>
				{chatList.map((chat) => {
					return (
						<Link
							to={String(chat.id)}
							component={<ListItem />}
							key={chat.id}
						>
							<ListItemText
								primary={`b24 id: ${chat['b24_user_id']}`}
							/>
						</Link>
					);
				})}
			</List>
		);
	}

	return <Chat roomId={intId} />;
};

export default ChatListPage;
