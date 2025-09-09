import { CircularProgress, Typography } from '@mui/material';
import { RecommendationItem } from './Recommendation.item';
import { useMaxWidth } from 'shared/model';

export const RecommendationsActual = ({ useActualRecommendationQuery }) => {
	const breakpoints = useMaxWidth();
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
				alignItems: breakpoints.md ? 'center' : undefined,
				gap: breakpoints.lg ? 2 : undefined,
			}}
			slotProps={{
				typography: {
					sx: {
						display: '-webkit-box',
						WebkitLineClamp: breakpoints.xxxl
							? breakpoints.lg
								? 4
								: 2
							: 1,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						maxHeight: breakpoints.xxxl
							? breakpoints.lg
								? '6.5rem'
								: '3.5rem'
							: '2rem',
					},
				},
			}}
		/>
	);
};
