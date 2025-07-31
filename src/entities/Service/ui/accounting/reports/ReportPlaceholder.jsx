import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
	Card,
	CardContent,
	CardHeader,
	IconButton,
	Skeleton,
} from '@mui/material';
import { Stack } from '@mui/system';
import useAccountingReportStore from '../../../model/accounting/accountingReportStore';

const ReportPlaceholder = () => {
	const clearReport = useAccountingReportStore.use.clearReport();

	return (
		<Card sx={{ height: '100%' }}>
			<CardHeader
				title="Отчёт 1"
				action={
					<IconButton onClick={() => clearReport()}>
						<CloseRoundedIcon />
					</IconButton>
				}
			/>

			<CardContent>
				<Stack spacing={2}>
					<Skeleton
						variant="text"
						sx={{ fontSize: '1rem' }}
						animation={false}
					/>
					<Skeleton
						variant="rounded"
						height={60}
						animation={false}
					/>
					<Skeleton
						variant="rounded"
						height={60}
						animation={false}
					/>
					<Skeleton
						variant="rounded"
						height={60}
						animation={false}
					/>
					<Skeleton
						variant="rounded"
						height={60}
						animation={false}
					/>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default ReportPlaceholder;
