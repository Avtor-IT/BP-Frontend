import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useMaxWidth } from 'shared/model';

const Employees = ({ ...props }) => {
	const breakpoints = useMaxWidth();

	return (
		<Card
			{...props}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
			}}
		>
			<CardHeader title="Сотрудники" />

			<CardContent
				sx={{
					position: 'relative',
					flexGrow: 1,
				}}
			>
				<Typography
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: '100%',
						textAlign: 'center',
						display: 'block',
					}}
					color="tertiary"
					variant={breakpoints.md ? 'R16' : 'R20'}
				>
					Информации о сотрудниках пока нет
				</Typography>
			</CardContent>
		</Card>
	);
};

export default Employees;
