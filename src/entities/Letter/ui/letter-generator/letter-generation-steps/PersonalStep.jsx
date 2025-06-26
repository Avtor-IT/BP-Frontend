import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import CheckCircleIcon from 'shared/icons/CheckCircle';
import { ScrollBox } from 'shared/ui/Scrollable';
import cls from '../Input.module.scss';
import FormSection from './FormSection';

const stamps = [
	{
		id: 1,
		title: 'Подпись1.png',
	},
	{
		id: 2,
		title: 'Подпись2.png',
	},
	{
		id: 3,
		title: 'Подпись3.png',
	},
	{
		id: 4,
		title: 'Подпись3.png',
	},
	{
		id: 5,
		title: 'Подпись3.png',
	},
	{
		id: 6,
		title: 'Подпись3.png',
	},
];

const facsimile = [
	{
		id: 1,
		title: 'Факсимиле 1.png',
	},
	{
		id: 2,
		title: 'Факсимиле 2.png',
	},
	{
		id: 3,
		title: 'Факсимиле 3.png',
	},
	{
		id: 4,
		title: 'Факсимиле 3.png',
	},
	{
		id: 5,
		title: 'Факсимиле 3.png',
	},
	{
		id: 6,
		title: 'Факсимиле 3.png',
	},
];

const PersonalStep = ({ config, ...props }) => {
	return (
		<Grid
			{...props}
			container
			columns={2}
			columnSpacing={3}
		>
			<Grid size={1}>
				<FormSection
					section="personal"
					config={config}
				/>
			</Grid>
			<Grid size={1}>
				<Stack
					gap={2}
					height="100%"
				>
					<Stack
						gap={3}
						flexGrow={1}
					>
						<Typography variant="M20">Печать</Typography>
						<ScrollBox>
							{stamps.map((stamp) => (
								<Stack
									key={stamp.id}
									direction="row"
									justifyContent="space-between"
									alignItems="center"
									gap={3}
								>
									<Button
										className={cls.letterInput}
										variant="card"
									>
										<Typography
											variant="R16"
											color="#000"
										>
											{stamp.title}
										</Typography>
									</Button>

									<IconButton>
										<CheckCircleIcon />
									</IconButton>
								</Stack>
							))}
						</ScrollBox>
					</Stack>

					<Stack
						gap={3}
						flexGrow={1}
					>
						<Typography variant="M20">Факсимиле</Typography>
						<ScrollBox>
							{facsimile.map((facsimile) => (
								<Stack
									key={facsimile.id}
									direction="row"
									justifyContent="space-between"
									alignItems="center"
									gap={3}
								>
									<Button
										className={cls.letterInput}
										variant="card"
									>
										<Typography
											variant="R16"
											color="#000"
										>
											{facsimile.title}
										</Typography>
									</Button>

									<IconButton>
										<CheckCircleIcon />
									</IconButton>
								</Stack>
							))}
						</ScrollBox>
					</Stack>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default PersonalStep;
