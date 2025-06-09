import ReportsList from '../../ui/ReportsList.jsx';
import {
	accountingReferences,
	groups,
	useAccountingReports,
} from '../model/accountingReports';

const AccountingReports = () => {
	const reports = useAccountingReports();

	return (
		<ReportsList
			reports={reports}
			groups={groups}
			references={accountingReferences}
		/>
	);
};

export default AccountingReports;
