import {
	Box,
	Button,
	FormControlLabel,
	FormGroup,
	Grid,
	IconButton,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import CheckCircleIcon from 'shared/icons/CheckCircle';
import cls from './Input.module.scss';

const destFields = {
	doc_name: 'Название документа',
	acc_num: 'Номер письма для учета',
	ans_num: 'Номер письма на которое отвечаете',
	date: 'Дата письма',
	job: 'Должность',
	initials: 'ФИО',
};

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

const DestinationStep = ({ ...props }) => {
	return (
		<Grid
			{...props}
			container
			columns={2}
			columnSpacing={3}
		>
			<Grid size={1}>
				<Stack gap={3}>
					<Typography variant="M20">Адресат</Typography>
					<Stack gap={2}>
						{Object.entries(destFields).map(([field, label]) => (
							<FormGroup key={field}>
								<FormControlLabel
									control={
										<TextField
											variant="filled"
											fullWidth
										/>
									}
									sx={{
										alignItems: 'start',
									}}
									slotProps={{
										typography: {
											variant: 'R16',
										},
									}}
									labelPlacement="top"
									label={label}
								/>
							</FormGroup>
						))}
					</Stack>
				</Stack>
			</Grid>
			<Grid size={1}>
				<Stack
					gap={3}
					height="100%"
				>
					<Typography variant="M20">Фирменный бланк</Typography>
					<Box
						flexGrow={1}
						position="relative"
					>
						<Stack
							position="absolute"
							overflow="auto"
							top={0}
							bottom={0}
							right={0}
							left={0}
							gap={1}
						>
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
						</Stack>
					</Box>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default DestinationStep;
