import useAccountingReportStore from './accountingReportStore';
import { ENSReport, ReportPlaceholder, RequirementsReport } from '../reports';

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
		createReport('Требования', 'GOVERNMENT', RequirementsReport),
		createReport('Сальдо ЕНС', 'GOVERNMENT', ENSReport),
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
