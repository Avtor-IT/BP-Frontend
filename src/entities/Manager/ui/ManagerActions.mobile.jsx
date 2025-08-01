import {
	Button,
	CardActions,
	Divider,
	IconButton,
	Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { CallIcon } from 'shared/icons/Call';
import MessageIcon from 'shared/icons/Message';
import { useMaxWidth } from 'shared/model';
import { AppRoutes, RoutePath } from 'shared/router';

const mobileSx = {
	p: 0,
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: 0,
};

const ManagerActionsMobile = () => {
	const breakpoints = useMaxWidth();

	return (
		<CardActions
			sx={Object.assign(
				{
					color: 'tertiary.main',
					display: 'flex',
					justifyContent: 'space-between',
				},
				breakpoints.xl ? mobileSx : {}
			)}
		>
			<Button
				component={Link}
				to={RoutePath[AppRoutes.MAIN]}
				variant="unstyled"
				endIcon={
					<IconButton sx={{ p: 0 }}>
						<CallIcon
							color={breakpoints.xl ? 'success' : undefined}
							strokeWidth={1.5}
						/>
					</IconButton>
				}
				sx={
					breakpoints.xl && {
						p: 1,
						borderTop: '1px solid',
						borderColor: 'background.light',
						borderRadius: 0,
						flexGrow: 1,
					}
				}
			>
				{!breakpoints.xl && (
					<Typography variant="R16">Заказать звонок</Typography>
				)}
			</Button>

			{breakpoints.xl && (
				<Divider
					orientation="vertical"
					flexItem
				/>
			)}

			<Button
				component={Link}
				to={RoutePath[AppRoutes.MAIN]}
				variant="unstyled"
				endIcon={
					<IconButton sx={{ p: 0 }}>
						<MessageIcon
							color={breakpoints.xl ? 'secondary' : undefined}
							strokeWidth={1.5}
						/>
					</IconButton>
				}
				sx={
					breakpoints.xl && {
						p: 1,
						borderTop: '1px solid',
						borderColor: 'background.light',
						borderRadius: 0,
						flexGrow: 1,
						marginLeft: '0 !important',
					}
				}
			>
				{!breakpoints.xl && (
					<Typography variant="R16">Написать</Typography>
				)}
			</Button>
		</CardActions>
	);
};

export default ManagerActionsMobile;
