import { Grid } from '@mui/system';
import useAccountingReportStore from '../../model/accounting/accountingReportStore';
import {
	accountingReferences,
	groups,
	useAccountingReports,
} from '../../model/accounting/accountingReports';
import ReportsListCard from '../ReportsListCard';
import DocsEcp from './DocsECP';
import DocsToApprove from './DocsToApprove';
import Taxes from './reports/Taxes';
import { useMaxWidth } from 'shared/model';
import { Recommendations } from '../recommends/Recommendations';
import { useActualRecommendation } from '../../api/accounting/getActualRecommendation';
import { useRecommendationsHistory } from '../../api/accounting/getReccommendationsHistory';

const Accounting = ({ ...props }) => {
	const breakpoints = useMaxWidth();
	const selectedReport = useAccountingReportStore.use.report();
	const reports = useAccountingReports();

	return (
		<Grid
			container
			spacing={2}
			columns={5}
			alignItems="stretch"
			{...props}
		>
			<Grid size={{ xxxl: 1, lg: 2, xs: 5 }}>
				<ReportsListCard
					reports={reports}
					groups={groups}
					references={accountingReferences}
					slotProps={{
						reportButton: (report) =>
							report.title === selectedReport?.title
								? {
										variant: 'outlined',
								  }
								: {
										sx: {
											border: '1px solid transparent',
										},
								  },
					}}
				/>
			</Grid>

			<Grid size={{ xxxl: 2, lg: 3, xs: 5 }}>
				{selectedReport ? <selectedReport.component /> : <Taxes />}
			</Grid>
			<Grid size={{ xxxl: 1, xs: 5 }}>
				<DocsEcp
					direction={breakpoints.xxxl ? 'row' : 'column'}
					sx={{ height: '100%' }}
				/>
			</Grid>
			<Grid size={{ xxxl: 1, xs: 5 }}>
				<DocsToApprove sx={{ height: '100%' }} />
			</Grid>

			<Grid size="grow">
				<Recommendations
					useActualRecommendationQuery={useActualRecommendation}
					useRecommendationsHistoryQuery={useRecommendationsHistory}
				/>
			</Grid>
		</Grid>
	);
};

export default Accounting;
