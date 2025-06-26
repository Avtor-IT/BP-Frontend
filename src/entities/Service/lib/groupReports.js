const groupReports = (reports, groups) =>
	reports.reduce((grouped, report) => {
		const group = groups[report.group] || '';
		if (grouped[group]) {
			grouped[group].push(report);
			return grouped;
		}
		grouped[group] = [report];
		return grouped;
	}, {});

export default groupReports;
