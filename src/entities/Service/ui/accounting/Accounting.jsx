import { Grid } from '@mui/system';
import useAccountingReportStore from '../../model/accounting/accountingReportStore';
import {
	accountingReferences,
	groups,
	useAccountingReports,
} from '../../model/accounting/accountingReports';
import ReportsList from '../ReportsList';
import DocsEcp from './DocsECP';
import DocsToApprove from './DocsToApprove';
import Taxes from './reports/Taxes';

const Accounting = ({ ...props }) => {
	const report = useAccountingReportStore.use.report();
	const reports = useAccountingReports();

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
						<ReportsList
							reports={reports}
							groups={groups}
							references={accountingReferences}
						/>
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
