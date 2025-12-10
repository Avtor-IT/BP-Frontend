import { Skeleton } from '@mui/material';
import { Chat, CHAT_TYPE } from 'entities/Chat';
import { useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AppRoutes, RoutePath } from 'shared/router';

const DepartmentChatPage = () => {
	const { id: roomid } = useParams();
	const intid = parseInt(roomid);
	const navigate = useNavigate();

	useLayoutEffect(() => {
		if (!intid) {
			navigate(RoutePath[AppRoutes.CHATS], { replace: true });
		}
	}, [intid, navigate]);

	if (!intid) {
		return <Skeleton />;
	}

	return (
		<Chat
			roomId={intid}
			type={CHAT_TYPE.DEPARTMENT}
		/>
	);
};

export default DepartmentChatPage;
