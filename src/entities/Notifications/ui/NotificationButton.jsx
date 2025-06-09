import { IconButton } from '@mui/material';
import NotificationsIcon from 'shared/icons/Notifications';
import Badge from '@mui/material/Badge';

const NotificationButton = () => {
	return (
		<IconButton>
			<Badge
				badgeContent={100}
				color="error"
			>
				<NotificationsIcon />
			</Badge>
		</IconButton>
	);
};

export default NotificationButton;
