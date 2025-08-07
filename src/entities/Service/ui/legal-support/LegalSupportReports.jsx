import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Grid,
	Input,
	Stack,
	Typography,
} from '@mui/material';
import { CircledTitle } from 'shared/ui/CircledTitle';
import { gradient } from '../ReportsListCard';
import { legalSuportServices } from '../../model/legal-support/services-dictionary';

const LegalSupportReports = () => {
	return (
		<Card>
			<CardHeader
				title={
					<Box position="relative">
						<CircledTitle
							title="Отчеты"
							color="secondary.main"
							slotProps={{
								circle: {
									sx: {
										background: gradient,
										minWidth: 678,
										right: -290,
										left: 'auto',
									},
								},
							}}
						/>

						<Input
							variant="card"
							placeholder="Поиск"
							sx={{
								minWidth: 720,
								position: 'absolute',
								left: '50%',
								transform: 'translateX(-50%)',
								typography: 'M16',
								paddingBlock: '10px',
								paddingInline: 2,
								borderRadius: 2,
							}}
						/>
					</Box>
				}
			/>
			<CardContent>
				<Grid
					container
					columns={2}
					spacing={10}
				>
					<Grid size={1}>
						<Stack gap={2}>
							{Object.entries(legalSuportServices.column1).map(
								([title, reports]) => (
									<Stack
										key={title}
										gap={1}
									>
										<Typography
											variant="M20"
											color="secondary"
										>
											{title}
										</Typography>
										<Stack
											direction="row"
											flexWrap="wrap"
											gap={1}
										>
											{reports.map((report) => (
												<Button
													key={report.name}
													variant="card"
													sx={{
														paddingInline: 1,
														color: 'textSecondary.default',
														typography: 'R16',
													}}
												>
													{report.name}
												</Button>
											))}
										</Stack>
									</Stack>
								)
							)}
						</Stack>
					</Grid>

					<Grid size={1}>
						<Stack gap={2}>
							{Object.entries(legalSuportServices.column2).map(
								([title, reports]) => (
									<Stack
										key={title}
										gap={1}
									>
										<Typography
											variant="M20"
											color="secondary"
										>
											{title}
										</Typography>
										<Stack
											direction="row"
											flexWrap="wrap"
											gap={1}
										>
											{reports.map((report) => (
												<Button
													key={report.name}
													variant="card"
													sx={{
														paddingInline: 1,
														color: 'textSecondary.default',
														typography: 'R16',
													}}
												>
													{report.name}
												</Button>
											))}
										</Stack>
									</Stack>
								)
							)}
						</Stack>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default LegalSupportReports;
