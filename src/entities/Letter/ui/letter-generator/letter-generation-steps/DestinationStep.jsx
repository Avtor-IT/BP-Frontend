import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import CheckCircleIcon from 'shared/icons/CheckCircle';
import { ScrollBox } from 'shared/ui/Scrollable';
import cls from '../Input.module.scss';
import FormSection from './FormSection';

const destinations = [
	{
		text: 'Название документа 1, Номер письма, номер письма ответа, Дата, должность ФИО',
		id: 1,
	},
	{
		text: 'Название документа 1, Номер письма, номер письма ответа, Дата, должность ФИОНазвание документа 1, Номер письма, номер письма ответа, Дата, должность ФИО',
		id: 2,
	},
	{
		text: 'Название документа 1, Номер письма, номер письма ответа, Дата, должность ФИОНазвание документа 1, Номер письма, номер письма ответа, Дата, должность ФИО',
		id: 3,
	},
	{
		text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem aliquid rem consequatur provident culpa? Alias earum perspiciatis ducimus quod ipsa. Amet cupiditate eveniet voluptatibus in qui corporis officiis corrupti repudiandae.',
		id: 4,
	},
];

const DestinationStep = ({ config, ...props }) => {
	return (
		<Grid
			{...props}
			container
			columns={2}
			columnSpacing={3}
		>
			<Grid size={1}>
				<FormSection
					section={'destination'}
					config={config}
				/>
			</Grid>
			<Grid size={1}>
				<Stack
					gap={3}
					height="100%"
				>
					<Typography variant="M20">
						Автозаполнение адресата
					</Typography>
					<ScrollBox>
						{destinations.map((destination) => (
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

export default DestinationStep;
