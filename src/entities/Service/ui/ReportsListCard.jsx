import {
	Button,
	Card,
	CardContent,
	CardHeader,
	Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useMaxWidth } from 'shared/model';
import { CircledTitle } from 'shared/ui/CircledTitle';
import groupReports from '../lib/groupReports';
import ReportOrders from './ReportOrders';
import { createAdditioinalSx } from 'shared/mui';

export const gradient = 'linear-gradient(15deg, #514996 10%, #FFF 40%)';

const ReportsListCard = ({ reports, groups, references, slotProps }) => {
	const breakpoints = useMaxWidth();
	const groupedReports = groupReports(reports, groups);

	return (
		<Card sx={{ minHeight: '100%' }}>
			<CardHeader
				title={
					<CircledTitle
						title="Отчеты"
						color="secondary.main"
						fullWidth
						slotProps={{
							circle: {
								sx: { background: gradient },
							},
						}}
					/>
				}
			/>
			<CardContent
				sx={{
					pt: 2,
					flexGrow: 1,
					display: 'flex',
					flexDirection: 'clolumn',
				}}
			>
				<Stack
					gap={{ xxxl: 2, xs: 3 }}
					flexGrow={1}
					justifyContent="space-between"
				>
					<Stack
						gap={2}
						maxWidth={
							breakpoints.xxxl && !breakpoints.xxl
								? 300
								: undefined
						}
					>
						{Object.entries(groupedReports).map(
							([group, reports], i) => (
								<Stack
									key={i}
									gap={1}
								>
									{group && (
										<Typography
											variant="M20"
											color="secondary"
										>
											{group}
										</Typography>
									)}
									<Stack
										direction="row"
										gap={1}
										flexWrap="wrap"
									>
										{reports.map((report, i) => (
											<Button
												key={i}
												onClick={() => report.action()}
												variant="card"
												color="secondary"
												{...slotProps?.reportButton?.(
													report
												)}
												sx={createAdditioinalSx(
													{
														borderRadius: '8px',
														borderWidth: 1.5,
														color: 'textSecondary.default',
														p: 2,
													},
													slotProps?.reportButton?.(
														report
													)?.sx
												)}
											>
												<Typography variant="R16">
													{report.title}
												</Typography>
											</Button>
										))}
									</Stack>
								</Stack>
							)
						)}
					</Stack>

					{references.map((reference, i) => (
						<ReportOrders
							key={i}
							title={reference.title}
						/>
					))}
				</Stack>
			</CardContent>
		</Card>
	);
};

export default ReportsListCard;
