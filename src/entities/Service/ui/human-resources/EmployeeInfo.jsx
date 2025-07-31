import { Box, Stack, Typography } from '@mui/material';
import { PersonAddIcon } from 'shared/icons/PersonAdd';
import { PersonDeleteIcon } from 'shared/icons/PersonDelete';
import { PersonRightIcon } from 'shared/icons/PersonRight';
import { PersonSickIcon } from 'shared/icons/PersonSick';
import { PersonUpIcon } from 'shared/icons/PersonUp';
import { PersonVacationIcon } from 'shared/icons/PersonVacation';
import { Button } from 'shared/mui/Button';

const infoFields = {
	name: 'ФИО',
	position: 'Должность',
	salary: 'Ставка',
	hire_date: 'Дата приёма',
	status: 'Статус',
};

const renderField = (field, value) => {
	switch (field) {
		case 'status':
			if (value === 'employed') {
				return (
					<Box
						component="span"
						sx={{ color: 'success.main' }}
					>
						Работает
					</Box>
				);
			}
			return (
				<Box
					component="span"
					sx={{ color: 'error.main' }}
				>
					Уволен
				</Box>
			);
		default:
			return value;
	}
};

const actions = {
	getDocuments: {
		icon: <PersonAddIcon strokeWidth={1.5} />,
		label: 'Документы',
	},
	holds: {
		icon: <PersonUpIcon strokeWidth={1.5} />,
		label: 'Удержания',
	},
	transition: {
		icon: <PersonRightIcon strokeWidth={1.5} />,
		label: 'Перевод',
	},
	vacation: {
		icon: <PersonVacationIcon strokeWidth={1.5} />,
		label: 'Отпуск',
	},
	sickLeave: {
		icon: <PersonSickIcon strokeWidth={1.5} />,
		label: 'Больничные',
	},
	fire: {
		icon: <PersonDeleteIcon strokeWidth={1.5} />,
		label: 'Уволить',
		disabled: true,
	},
};

const EmployeeInfo = ({ employee }) => {
	return (
		<Stack gap={2}>
			{Object.entries(infoFields).map(([field, label]) => (
				<Stack
					key={field}
					gap={1}
				>
					<Typography
						variant="R16"
						color="tertiary"
					>
						{label}
					</Typography>
					<Typography variant="R16">
						{renderField(field, employee[field])}
					</Typography>
				</Stack>
			))}

			<Stack
				direction="row"
				gap={2}
				flexWrap="wrap"
			>
				{Object.values(actions).map(({ icon, label, disabled }) => (
					<Button
						key={label}
						disabled={disabled}
						sx={{
							justifyContent: 'start',
							typography: 'R16',
							minHeight: 32,
							flex: '1 1 100px',
						}}
						variant="unstyled"
						startIcon={icon}
					>
						{label}
					</Button>
				))}
			</Stack>
		</Stack>
	);
};

export default EmployeeInfo;
