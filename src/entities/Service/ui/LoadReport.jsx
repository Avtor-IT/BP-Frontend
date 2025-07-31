import { Skeleton } from 'shared/mui/Skeleton';
import ReportCard from './ReportCard';

const LoadReport = ({
	reportTitle,
	query,
	queryParams,
	description,
	renderReport,
	disableCardWrap,
	...props
}) => {
	const { data, isLoading, isError } = query(queryParams);

	if (isLoading) {
		return (
			<ReportCard
				reportTitle={reportTitle}
				{...props}
			>
				{Array.from({ length: 5 }).map((_, index) => (
					<Skeleton
						key={index}
						variant="text"
						sx={{ fontSize: '2rem' }}
					/>
				))}
			</ReportCard>
		);
	}

	if (isError) {
		return (
			<ReportCard
				reportTitle={reportTitle}
				description={description.error || 'Ошибка загрузки отчётности'}
				{...props}
			/>
		);
	}

	if (data.length !== undefined && !data.length) {
		return (
			<ReportCard
				reportTitle={reportTitle}
				description={description.empty || 'Отчётность отсутствует'}
				{...props}
			/>
		);
	}

	if (disableCardWrap) {
		return renderReport(data);
	}

	return (
		<ReportCard
			reportTitle={reportTitle}
			{...props}
		>
			{renderReport(data)}
		</ReportCard>
	);
};

export default LoadReport;
