import { Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Circle from './Circle';

const TitledCard = ({ children, circleSx, title, sx, ...props }) => {
	return (
		<Card
			{...props}
			sx={{ position: 'relative', ...sx }}
		>
			<Circle
				sx={{
					background: 'var(--primary)',
					position: 'absolute',
					left: -220,
					top: -594,
					...circleSx,
				}}
			/>
			<CardContent sx={{ height: '100%' }}>
				<Box position="relative">
					<Typography
						zIndex={1}
						position="absolute"
						variant="M24"
						color="#fff"
						display="inline-block"
						width="100%"
					>
						{title}
					</Typography>
				</Box>
				{children}
			</CardContent>
		</Card>
	);
};

export default TitledCard;
