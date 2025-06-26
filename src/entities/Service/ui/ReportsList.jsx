import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import groupReports from '../lib/groupReports';
import ReportsUnloading from './ReportUnloading';
import ReportsCard from './ReportsCard';

const ReportsList = ({ reports, groups, references }) => {
	const groupedReports = groupReports(reports, groups);

	return (
		<ReportsCard>
			<Stack gap={2}>
				{Object.entries(groupedReports).map(([group, reports], i) => (
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
									sx={{ borderRadius: '8px' }}
									key={i}
									onClick={() => report.action()}
									variant="card"
								>
									<Typography variant="R16">
										{report.title}
									</Typography>
								</Button>
							))}
						</Stack>
					</Stack>
				))}

				{references.map((reference, i) => (
					<ReportsUnloading
						key={i}
						title={reference.title}
					/>
				))}
			</Stack>
		</ReportsCard>
	);
};

export default ReportsList;
