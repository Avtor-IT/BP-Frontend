import { Card, Stack, Typography } from '@mui/material';
import ExportIcon from 'shared/icons/Export';
import ImportIcon from 'shared/icons/Import';

const BillDocuments = ({ bill }) => {
	if (bill.status === 'needToPay')
		return (
			<>
				<Card sx={{ padding: 2 }}>
					<Stack
						direction="row"
						justifyContent="space-between"
					>
						<Typography variant="M20">Счет</Typography>

						<Stack
							direction="row"
							gap={1}
						>
							<ExportIcon strokeWidth={1.5} />
							<ImportIcon strokeWidth={1.5} />
						</Stack>
					</Stack>
				</Card>
				<Card sx={{ padding: 2 }}>
					<Stack
						direction="row"
						justifyContent="space-between"
					>
						<Typography variant="M20">Реалзиация</Typography>

						<Stack
							direction="row"
							gap={1}
						>
							<ExportIcon strokeWidth={1.5} />
							<ImportIcon strokeWidth={1.5} />
						</Stack>
					</Stack>
				</Card>
			</>
		);

	if (bill.status === 'paid')
		return (
			<>
				<Card sx={{ padding: 2 }}>
					<Stack
						direction="row"
						justifyContent="space-between"
					>
						<Typography variant="M20">Счет</Typography>

						<Stack
							direction="row"
							gap={1}
						>
							<ExportIcon strokeWidth={1.5} />
							<ImportIcon strokeWidth={1.5} />
						</Stack>
					</Stack>
				</Card>
				<Card sx={{ padding: 2 }}>
					<Stack
						direction="row"
						justifyContent="space-between"
					>
						<Typography variant="M20">Реалзиация</Typography>

						<Stack
							direction="row"
							gap={1}
						>
							<ExportIcon strokeWidth={1.5} />
							<ImportIcon strokeWidth={1.5} />
						</Stack>
					</Stack>
				</Card>
				<Card
					sx={{
						padding: 2,
						backgroundColor: 'success.dark',
						color: 'success.contrastText',
					}}
				>
					<Stack
						direction="row"
						justifyContent="space-between"
					>
						<Typography variant="M20">
							Акт выполненных услуг
						</Typography>

						<Stack
							direction="row"
							gap={1}
						>
							<ExportIcon strokeWidth={1.5} />
							<ImportIcon strokeWidth={1.5} />
						</Stack>
					</Stack>
				</Card>
			</>
		);

	if (bill.status === 'proccessing')
		return (
			<>
				<Card sx={{ padding: 2, color: 'tertiary.main' }}>
					<Stack
						direction="row"
						justifyContent="space-between"
					>
						<Typography variant="M20">Счет</Typography>

						<Stack
							direction="row"
							gap={1}
						>
							<ExportIcon strokeWidth={1.5} />
							<ImportIcon strokeWidth={1.5} />
						</Stack>
					</Stack>
				</Card>
				<Card sx={{ padding: 2, color: 'tertiary.main' }}>
					<Stack
						direction="row"
						justifyContent="space-between"
					>
						<Typography variant="M20">Реалзиация</Typography>

						<Stack
							direction="row"
							gap={1}
						>
							<ExportIcon strokeWidth={1.5} />
							<ImportIcon strokeWidth={1.5} />
						</Stack>
					</Stack>
				</Card>

				<Card
					sx={{
						padding: 2,
						color: 'tertiary.main',
					}}
				>
					<Stack
						direction="row"
						justifyContent="space-between"
					>
						<Typography variant="M20">
							Акт выполненных услуг
						</Typography>

						<Stack
							direction="row"
							gap={1}
						>
							<ExportIcon strokeWidth={1.5} />
							<ImportIcon strokeWidth={1.5} />
						</Stack>
					</Stack>
				</Card>
			</>
		);

	if (bill.status === 'completed')
		return (
			<>
				<Card sx={{ padding: 2 }}>
					<Stack
						direction="row"
						justifyContent="space-between"
					>
						<Typography variant="M20">Счет</Typography>

						<Stack
							direction="row"
							gap={1}
						>
							<ExportIcon strokeWidth={1.5} />
							<ImportIcon strokeWidth={1.5} />
						</Stack>
					</Stack>
				</Card>
				<Card sx={{ padding: 2 }}>
					<Stack
						direction="row"
						justifyContent="space-between"
					>
						<Typography variant="M20">Реалзиация</Typography>

						<Stack
							direction="row"
							gap={1}
						>
							<ExportIcon strokeWidth={1.5} />
							<ImportIcon strokeWidth={1.5} />
						</Stack>
					</Stack>
				</Card>

				<Card
					sx={{
						padding: 2,
					}}
				>
					<Stack
						direction="row"
						justifyContent="space-between"
					>
						<Typography variant="M20">
							Акт выполненных услуг
						</Typography>

						<Stack
							direction="row"
							gap={1}
						>
							<ExportIcon strokeWidth={1.5} />
							<ImportIcon strokeWidth={1.5} />
						</Stack>
					</Stack>
				</Card>
			</>
		);
};

export default BillDocuments;
