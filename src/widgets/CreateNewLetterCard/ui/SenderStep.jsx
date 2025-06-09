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
import { ExpandIcon } from 'shared/icons/Expand';
import cls from './Input.module.scss';

const backgrounds = [
	{ title: 'Название фона', id: 1 },
	{ title: 'Название фона', id: 2 },
	{ title: 'Название фона', id: 3 },
	{ title: 'Название фона', id: 4 },
	{ title: 'Название фона', id: 5 },
	{ title: 'Название фона', id: 6 },
	{ title: 'Название фона', id: 7 },
	{ title: 'Название фона', id: 8 },
	{ title: 'Название фона', id: 9 },
	{ title: 'Название фона', id: 10 },
];

const letterFields = {
	org_name: 'Название организации или ИП',
	address: 'Адрес регистрации юр. лица или ИП',
	phone: 'Телефон',
	email: 'E-mail',
	inn: 'ИНН',
	kpp: 'КПП',
};

const SenderStep = ({ ...props }) => {
	return (
		<Grid
			{...props}
			container
			columns={2}
			columnSpacing={3}
		>
			<Grid size={1}>
				<Stack gap={3}>
					<Typography variant="M20">Данные компании</Typography>
					<Stack gap={2}>
						{Object.entries(letterFields).map(([field, label]) => (
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
							{backgrounds.map((background) => (
								<Stack
									key={background.id}
									direction="row"
									justifyContent="space-between"
									alignItems="center"
									gap={3}
								>
									<Button
										className={cls.letterInput}
										variant="card"
										sx={{ borderRadius: 1 }}
									>
										<Typography
											variant="M16"
											color="#000"
										>
											{background.title}
										</Typography>

										<IconButton sx={{ p: 0 }}>
											<ExpandIcon fontSize="small" />
										</IconButton>
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

export default SenderStep;
