import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { CallIcon } from 'shared/icons/Call';
import MessageIcon from 'shared/icons/Message';
import { AppRoutes, RoutePath } from 'shared/router';

const ManagerActions = () => {
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
				to={RoutePath[AppRoutes.MAIN]}
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
