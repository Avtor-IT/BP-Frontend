import { CircularProgress, Stack, Typography } from '@mui/material';
import { RecommendationItem } from './Recommendation.item';

export const RecommendationsHistory = ({ useRecommendationsHistoryQuery }) => {
	const {
		data: recommendsList,
		isLoading,
		isError,
	} = useRecommendationsHistoryQuery();

	if (isLoading) {
		return <CircularProgress />;
	}

	if (isError) {
		return <Typography>Ошибка при загрузке рекомендации.</Typography>;
	}

	return (
		<Stack gap={2}>
			{recommendsList.map((rec) => (
				<RecommendationItem
					key={rec.id}
					recommendation={rec}
				/>
			))}
		</Stack>
	);
};
