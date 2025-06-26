import {
	groups,
	humanResourcesReferences,
	useHRReports,
} from '../../model/human-resources/reports';
import ReportsList from '../ReportsList';

const HumanResourcesReports = () => {
	const reports = useHRReports();

	return (
		<ReportsList
			reports={reports}
			groups={groups}
			references={humanResourcesReferences}
		/>
	);
};

export default HumanResourcesReports;
