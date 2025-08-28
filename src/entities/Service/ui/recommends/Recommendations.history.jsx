import { CardHeader, CircularProgress, Stack, Typography } from '@mui/material';
import { Card } from 'shared/ui/Card';
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
			{recommendsList.map((rec, i) => (
				<RecommendationItem
					key={i}
					recommendation={rec}
				/>
			))}
		</Stack>
	);
};
