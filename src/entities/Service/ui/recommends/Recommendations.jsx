import { Button, Card, CardContent, CardHeader } from '@mui/material';
import { useState } from 'react';
import { RecommendationsHistory } from './Recommendations.history';
import { RecommendationsActual } from './Recommendations.actual';
import ArrowIcon from 'shared/icons/Arrow';

const iconSx = (isOpen) => ({
	transform: `rotate(${isOpen ? '90deg' : '-90deg'})`,
	transition: 'all .1s ease',
	strokeWidth: 2,
});

export const Recommendations = ({
	useActualRecommendationQuery,
	useRecommendationsHistoryQuery,
}) => {
	const [isOpen, setOpen] = useState(false);

	const {
		data: actualRecommend,
		isLoading,
		isError,
	} = useActualRecommendationQuery();

	if (isError || isLoading || !actualRecommend) return null;

	return (
		<Card
			sx={{ border: '1.5px solid', borderColor: 'primary.main', gap: 2 }}
		>
			<CardHeader
				title="Рекомендации от специалиста"
				action={
					<Button
						variant="unstyled"
						sx={{ typography: 'R20', color: 'primary.main' }}
						onClick={() => setOpen(!isOpen)}
						endIcon={<ArrowIcon sx={iconSx(isOpen)} />}
					>
						История рекомендаций
					</Button>
				}
			/>
			<CardContent>
				{isOpen ? (
					<RecommendationsHistory
						useRecommendationsHistoryQuery={
							useRecommendationsHistoryQuery
						}
					/>
				) : (
					<RecommendationsActual
						useActualRecommendationQuery={
							useActualRecommendationQuery
						}
					/>
				)}
			</CardContent>
		</Card>
	);
};
