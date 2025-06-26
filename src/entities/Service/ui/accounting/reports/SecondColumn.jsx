import { Card, CardContent, CardHeader, Skeleton } from '@mui/material';
import { Stack } from '@mui/system';

const SecondColumn = ({ ...props }) => {
	return (
		<Card {...props}>
			<CardHeader title="Отчёт 2" />

			<CardContent>
				<Stack spacing={2}>
					<Skeleton
						variant="text"
						sx={{ fontSize: '1rem' }}
						animation={false}
					/>
					<Skeleton
						variant="text"
						sx={{ fontSize: '1rem' }}
						animation={false}
					/>
					<Skeleton
						variant="text"
						sx={{ fontSize: '1rem' }}
						animation={false}
					/>
					<Skeleton
						variant="rounded"
						height={60}
						animation={false}
					/>
					<Skeleton
						variant="text"
						sx={{ fontSize: '1rem' }}
						animation={false}
					/>
					<Skeleton
						variant="rounded"
						height={60}
						animation={false}
					/>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default SecondColumn;
