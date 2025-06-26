import ENS from '../../ui/accounting/reports/ENS';
import ReportPlaceholder from '../../ui/accounting/reports/ReportPlaceholder';
import Requirements from '../../ui/accounting/reports/Requirements';
import useAccountingReportStore from './accountingReportStore';

export const groups = {
	GOVERNMENT: 'ГОСОРГАНЫ',
	FINANCE: 'Финансовая информация',
};

export const useAccountingReports = () => {
	const setReport = useAccountingReportStore.use.setReport();

	const createReport = (title, group, component) => ({
		title,
		group,
		action: () => setReport({ title, component }),
	});

	return [
		createReport('ФНС', 'GOVERNMENT', ReportPlaceholder),
		createReport('СФП', 'GOVERNMENT', ReportPlaceholder),
		createReport('Росстат', 'GOVERNMENT', ReportPlaceholder),
		createReport('Требования', 'GOVERNMENT', Requirements),
		createReport('Сальдо ЕНС', 'GOVERNMENT', ENS),
		createReport('Другие отчеты', 'GOVERNMENT', ReportPlaceholder),
		{
			title: 'Выгрузка с ОФД',
			group: 'FINANCE',
			action: function () {
				console.log(this);
			},
		},
		{
			title: 'Выписки с банков',
			group: 'FINANCE',
			action: function () {
				console.log(this);
			},
		},
	];
};

export const accountingReferences = [
	{ title: 'Анализ расходов и доходов' },
	{ title: 'Сведения из ЕГРЮЛ/ЕГРИП' },
];
