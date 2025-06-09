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

const letterFields = {
	topic: 'Тема',
	text: { label: 'Текст письма', textFieldPops: { rows: 12 } },
};

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

const LetterStep = ({ ...props }) => {
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
						{Object.entries(letterFields).map(([field, label]) => (
							<FormGroup key={field}>
								<FormControlLabel
									control={
										<TextField
											multiline
											{...label.textFieldPops}
											variant="filled"
											fullWidth
										/>
									}
									sx={{
										alignItems: 'start',
										flexGrow: 1,
									}}
									slotProps={{
										typography: {
											variant: 'R16',
										},
									}}
									labelPlacement="top"
									label={label?.label || label}
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
					<Typography variant="M20">
						Автозаполнение темы письма
					</Typography>
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
						</Stack>
					</Box>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default LetterStep;
