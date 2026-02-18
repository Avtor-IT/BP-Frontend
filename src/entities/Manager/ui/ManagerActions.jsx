import { Button, Stack, Typography } from '@mui/material';
import { useRoom } from 'entities/Chat';
import { generatePath, Link } from 'react-router-dom';
import { CallIcon } from 'shared/icons/Call';
import MessageIcon from 'shared/icons/Message';
import { AppRoutes, RoutePath } from 'shared/router';

const ManagerActions = ({ chatRoute }) => {
	return (
		<Stack
			direction="row"
			gap={3}
		>
			<Button
				component={Link}
				to={RoutePath[AppRoutes.MAIN]}
				variant="unstyled"
				endIcon={<CallIcon strokeWidth={1.5} />}
			>
				<Typography variant="R16">Заказать звонок</Typography>
			</Button>

			<Button
				component={Link}
				loadingPosition="start"
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
