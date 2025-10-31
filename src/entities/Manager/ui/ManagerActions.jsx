import { Button, Stack, Typography } from '@mui/material';
import { useRoom } from 'entities/Chat';
import { generatePath, Link } from 'react-router-dom';
import { CallIcon } from 'shared/icons/Call';
import MessageIcon from 'shared/icons/Message';
import { AppRoutes, RoutePath } from 'shared/router';

const ManagerActions = ({ manager }) => {
	const { data: room, isPending, isError } = useRoom(manager?.ID);

	const chatRoute = room
		? generatePath(RoutePath[AppRoutes.CHAT], {
				id: room.id,
		  })
		: null;

	return (
		<Stack
			direction="row"
			gap={3}
		>
			<Button
				component={Link}
				to={RoutePath[AppRoutes.MAIN]}
				variant="unstyled"
				disabled={isError}
				loading={isPending}
				endIcon={<CallIcon strokeWidth={1.5} />}
			>
				<Typography variant="R16">Заказать звонок</Typography>
			</Button>

			<Button
				component={Link}
				disabled={isError}
				loadingPosition="start"
				loading={isPending}
				to={chatRoute}
				variant="unstyled"
				endIcon={<MessageIcon strokeWidth={1.5} />}
			>
				<Typography variant="R16">Написать</Typography>
			</Button>
		</Stack>
	);
};

export default ManagerActions;
