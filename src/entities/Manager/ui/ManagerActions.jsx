import { Button, Stack, Typography } from '@mui/material';
import { useRoom } from 'entities/Chat';
import { generatePath, Link } from 'react-router-dom';
import { CallIcon } from 'shared/icons/Call';
import MessageIcon from 'shared/icons/Message';
import { AppRoutes, RoutePath } from 'shared/router';

const ManagerActions = ({ manager }) => {
	const { data: room, isPending, isError } = useRoom(manager?.ID);

	return (
		<Stack
			direction="row"
			gap={3}
		>
			<Button
				component={Link}
				to={RoutePath[AppRoutes.MAIN]}
				variant="unstyled"
			>
				<Stack
					direction="row"
					alignItems="center"
					gap={1}
				>
					<Typography variant="R16">Заказать звонок</Typography>
					<CallIcon strokeWidth={1.5} />
				</Stack>
			</Button>
			<Button
				component={Link}
				disabled={isPending || isError}
				to={
					room
						? generatePath(RoutePath[AppRoutes.CHAT], {
								id: room.id,
						  })
						: '/'
				}
				variant="unstyled"
			>
				<Stack
					direction="row"
					alignItems="center"
					gap={1}
				>
					<Typography variant="R16">Написать</Typography>
					<MessageIcon strokeWidth={1.5} />
				</Stack>
			</Button>
		</Stack>
	);
};

export default ManagerActions;
