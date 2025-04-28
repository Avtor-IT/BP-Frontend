import { Card, CardContent, Typography } from '@mui/material';
import { Stack } from '@mui/system';

const ErrorCard = ({ text }) => {
	return (
		<Card sx={{ height: '100%' }}>
			<CardContent sx={{ height: '100%' }}>
				<Stack
					alignItems="center"
					height="100%"
					justifyContent="center"
				>
					<Typography variant="M24">{text || 'Ошибка'}</Typography>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default ErrorCard;
