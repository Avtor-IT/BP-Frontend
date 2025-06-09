import {
	Box,
	Button,
	Checkbox,
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

const personalFields = {
	position: 'Должность',
	initials: 'ФИО',
	phone: 'Телефон',
	date: 'Дата письма',
};

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

const PersonalStep = ({ ...props }) => {
	return (
		<Grid
			{...props}
			container
			columns={2}
			columnSpacing={3}
		>
			<Grid size={1}>
				<Stack gap={3}>
					<Typography variant="M20">Обращение</Typography>
					<Stack gap={2}>
						{Object.entries(personalFields).map(
							([field, label]) => (
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
							)
						)}
					</Stack>

					<FormGroup>
						<FormControlLabel
							sx={{ justifyContent: 'start' }}
							control={<Checkbox />}
							label="Необходима печать"
							labelPlacement="start"
						/>
					</FormGroup>
				</Stack>
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
							</Stack>
						</Box>
					</Stack>

					<Stack
						gap={3}
						flexGrow={1}
					>
						<Typography variant="M20">Факсимиле</Typography>
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
							</Stack>
						</Box>
					</Stack>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default PersonalStep;
