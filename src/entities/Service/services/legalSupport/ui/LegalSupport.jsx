import { Grid } from '@mui/system';
import { Card } from 'shared/ui/Card';
import LegalSupportReports from './LegalSupportReports';
import Docs from './Docs';

const LegalSupport = () => {
	return (
		<Grid
			container
			spacing={2}
			columns={5}
			flexGrow={1}
		>
			<Grid size={{ xxxl: 1, xs: 2 }}>
				<Card height="100%">
					<LegalSupportReports />
				</Card>
			</Grid>
			<Grid size={{ xxxl: 4, xs: 3 }}>
				<Card height="100%">
					<Docs />
				</Card>
			</Grid>
		</Grid>
	);
};

export default LegalSupport;
