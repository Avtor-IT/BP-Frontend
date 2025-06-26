import { Grid } from '@mui/system';
import DocsToApprove from './DocsToApprove';
import Employees from './Employees';
import HumanResourcesReports from './HumanResourcesReports';

const HumanResources = () => {
	return (
		<Grid
			container
			spacing={2}
			columns={5}
			flexGrow={1}
		>
			<Grid size={{ xxxl: 1, lg: 2, xs: 5 }}>
				<HumanResourcesReports />
			</Grid>
			<Grid size={{ lg: 3, xs: 5 }}>
				<Employees sx={{ height: '100%' }} />
			</Grid>
			<Grid size={{ xxxl: 1, xs: 5 }}>
				<DocsToApprove sx={{ height: '100%' }} />
			</Grid>
		</Grid>
	);
};

export default HumanResources;
