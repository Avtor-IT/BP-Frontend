import { Grid } from '@mui/system';
import Taxes from '../reports/default/ui/Taxes';
import DocsEcp from '../reports/default/ui/DocsECP';
import DocsToApprove from '../reports/default/ui/DocsToApprove';
import useAccountingReportStore from '../model/accountingReportStore';
import AccountingReports from './AccountingReports';

const Accounting = ({ ...props }) => {
	const report = useAccountingReportStore.use.report();

	return (
		<Grid
			container
			spacing={2}
			columns={5}
			alignItems="stretch"
			{...props}
		>
			{report ? (
				<Grid size={{ lg: 'grow', xs: 5 }}>
					<report.component />
				</Grid>
			) : (
				<>
					<Grid size={{ xxxl: 1, lg: 2, xs: 5 }}>
						<AccountingReports />
					</Grid>
					<Grid size={{ xxxl: 2, lg: 3, xs: 5 }}>
						<Taxes />
					</Grid>
					<Grid size={{ xxxl: 1, xs: 5 }}>
						<DocsEcp sx={{ height: '100%' }} />
					</Grid>
					<Grid size={{ xxxl: 1, xs: 5 }}>
						<DocsToApprove sx={{ height: '100%' }} />
					</Grid>
				</>
			)}
		</Grid>
	);
};

export default Accounting;
