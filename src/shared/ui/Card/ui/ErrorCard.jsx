import { Card, CardContent, Typography } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/system';

const ErrorCard = ({ text, ...props }) => {
	const theme = useTheme();
	const downXxl = useMediaQuery(theme.breakpoints.down('xxl'));

	return (
		<Card
			sx={{ height: '100%', ...props.sx }}
			{...props}
		>
			<CardContent
				sx={{
					flexGrow: 1,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Typography
					color="error"
					variant={downXxl ? 'M20' : 'M24'}
				>
					{text || 'Ошибка'}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default ErrorCard;
