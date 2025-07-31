import {
	groups,
	humanResourcesReferences,
	useHRReports,
} from '../../model/human-resources/reports';
import ReportsListCard from '../ReportsListCard';

const ReportList = () => {
	const reports = useHRReports();

	return (
		<ReportsListCard
			reports={reports}
			groups={groups}
			references={humanResourcesReferences}
		/>
	);
};

export default ReportList;
