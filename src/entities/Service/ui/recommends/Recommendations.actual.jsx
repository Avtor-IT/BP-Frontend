import { CircularProgress, Typography } from '@mui/material';
import { RecommendationItem } from './Recommendation.item';

export const RecommendationsActual = ({ useActualRecommendationQuery }) => {
	const {
		data: actualRecommendation,
		isLoading,
		isError,
	} = useActualRecommendationQuery();

	if (isLoading) {
		return <CircularProgress />;
	}

	if (isError) {
		return <Typography>Ошибка при загрузке рекомендаций.</Typography>;
	}

	if (!actualRecommendation) {
		return (
			<Typography
				color="textSecondary"
				variant="L20"
			>
				Рекомендаций пока нет.
			</Typography>
		);
	}

	return (
		<RecommendationItem
			recommendation={actualRecommendation}
			sx={{
				display: '-webkit-box',
				WebkitLineClamp: 1,
				WebkitBoxOrient: 'vertical',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				maxHeight: '2rem',
			}}
		/>
	);
};
