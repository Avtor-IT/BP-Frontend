import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { PersonAddIcon } from 'shared/icons/PersonAdd';
import { PersonDeleteIcon } from 'shared/icons/PersonDelete';
import { PersonRightIcon } from 'shared/icons/PersonRight';
import { PersonSickIcon } from 'shared/icons/PersonSick';
import { PersonUpIcon } from 'shared/icons/PersonUp';
import { PersonVacationIcon } from 'shared/icons/PersonVacation';
import { useMaxWidth } from 'shared/model';
import { employeeInfoMapper } from '../../lib/employeeInfoMapper';

const detailedFields = [
	{
		name: 'ФИО',
		position: 'Должность',
		salary: 'Ставка',
		hire_date: 'Дата приёма',
		status: 'Статус',
		marital_status: 'Семейное положение',
		children: 'Информация о детях',
	},
	{
		citizenship: 'Гражданство',
		passportNumber: 'Паспорт',
		passportMailAddress: 'Место регистрации',
		livivng_adress: 'Место жительства',
		phone: 'Номер телефона',
	},
	{
		inn: 'ИНН',
		snils: 'СНИЛС',
		military_license_number: 'Военный билет',
		bank_detailsAccount_number: 'Банковские реквезиты',
	},
];

const renderField = (field, value) => {
	switch (field) {
		case 'children':
			return value.map(({ name }) => name);
		case 'status':
			if (value === 'employed') {
				return <Typography color="success.main">Работающий</Typography>;
			}
			break;
		case 'marital_status':
			if (value === 'married') {
				return 'Женат';
			}
			break;
		case 'citizenship':
			if (value === 'russia') {
				return 'Россия';
			}
			break;
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

const DetailedEmployeeInfo = ({ employee }) => {
	const breakpoints = useMaxWidth();
	const formattedEmployee = useMemo(() => {
		return employeeInfoMapper(employee);
	}, [employee]);

	return (
		<Box
			height="100%"
			paddingBottom={
				breakpoints.lg ? (breakpoints.md ? '144px' : '92px') : 8
			}
		>
			<Grid
				container
				columns={{ lg: 3, md: 2, xs: 1 }}
				spacing={3}
				sx={{ justifyContent: 'space-between' }}
			>
				{detailedFields.map((detailFieldsGroup, i) => (
					<Grid
						size={1}
						display="flex"
						flexDirection="column"
						key={i}
						gap={2}
						maxWidth={220}
					>
						{Object.entries(detailFieldsGroup).map(
							([field, label]) => (
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
										{renderField(
											field,
											formattedEmployee[field]
										)}
									</Typography>
								</Stack>
							)
						)}
					</Grid>
				))}
			</Grid>

			<Stack
				direction="row"
				gap={3}
				rowGap={1}
				flexWrap="wrap"
				justifyContent={
					breakpoints.xxxl && !breakpoints.lg
						? 'center'
						: 'space-between'
				}
				backgroundColor="background.contrast"
				sx={{
					position: 'absolute',
					bottom: -24,
					left: 0,
					right: 0,
					padding: breakpoints.lg ? 2 : 3,
				}}
			>
				{Object.values(actions).map(({ icon, label, disabled }) => (
					<Button
						key={label}
						sx={{
							typography: breakpoints.xl ? 'R12' : 'R16',
							minHeight: 32,
							'& span': {
								marginLeft: 0,
							},
							flex: breakpoints.lg && '1 1 100px',
							justifyContent: 'start',
						}}
						disabled={disabled}
						variant="unstyled"
						startIcon={icon}
					>
						{label}
					</Button>
				))}
			</Stack>
		</Box>
	);
};

export default DetailedEmployeeInfo;
