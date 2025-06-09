import {
	groups,
	humanResourcesReferences,
	useHRReports,
} from '../model/reports';
import ReportsList from '../../ui/ReportsList.jsx';

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
