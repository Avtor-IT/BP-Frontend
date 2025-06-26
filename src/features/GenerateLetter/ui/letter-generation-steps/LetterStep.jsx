import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import CheckCircleIcon from 'shared/icons/CheckCircle';
import { ScrollBox } from 'shared/ui/Scrollable';
import cls from '../Input.module.scss';
import FormSection from './FormSection';

const templates = [
	{
		id: 1,
		text: 'template1',
	},
	{
		id: 2,
		text: 'template2',
	},
	{
		id: 3,
		text: 'template3',
	},
];

const LetterStep = ({ config, ...props }) => {
	return (
		<Grid
			{...props}
			container
			columns={2}
			columnSpacing={3}
		>
			<Grid size={1}>
				<FormSection
					section="letter"
					config={config}
				/>
			</Grid>
			<Grid size={1}>
				<Stack
					gap={3}
					height="100%"
				>
					<Typography variant="M20">
						Автозаполнение темы письма
					</Typography>
					<ScrollBox>
						{templates.map((destination) => (
							<Stack
								key={destination.id}
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
										{destination.text}
									</Typography>
								</Button>

								<IconButton>
									<CheckCircleIcon />
								</IconButton>
							</Stack>
						))}
					</ScrollBox>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default LetterStep;
