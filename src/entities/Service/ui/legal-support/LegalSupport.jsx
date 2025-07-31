import { Grid } from '@mui/system';
import { Card } from 'shared/ui/Card';
import LegalSupportReports from './LegalSupportReports';
import DocsEcp from './DocsECP';
import DocsToApprove from './DocsToApprove';

const LegalSupport = () => {
	return (
		<Grid
			container
			spacing={2}
			columns={5}
			flexGrow={1}
		>
			<Grid size={5}>
				<Card height="100%">
					<LegalSupportReports />
				</Card>
			</Grid>
			<Grid size={5}>
				<Grid
					size={5}
					columns={2}
					container
					spacing={2}
				>
					<Grid size={1}>
						<DocsEcp direction="row" />
					</Grid>
					<Grid size={1}>
						<DocsToApprove direction="row" />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default LegalSupport;
