import {
	Button,
	Card,
	CardContent,
	CardHeader,
	IconButton,
} from '@mui/material';
import { useState } from 'react';
import { RecommendationsHistory } from './Recommendations.history';
import { RecommendationsActual } from './Recommendations.actual';
import ArrowIcon from 'shared/icons/Arrow';
import { useMaxWidth } from 'shared/model';

const iconSx = (isOpen) => ({
	transform: `rotate(${isOpen ? '90deg' : '-90deg'})`,
	transition: 'all .1s ease',
	strokeWidth: 2,
});

export const Recommendations = ({
	useActualRecommendationQuery,
	useRecommendationsHistoryQuery,
}) => {
	const breakpoints = useMaxWidth();
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
				title="Рекомендации от&nbsp;специалиста"
				slotProps={{
					title: {
						sx: { typography: breakpoints.xl ? 'M20' : undefined },
					},
				}}
				action={
					breakpoints.lg ? (
						breakpoints.md ? null : (
							<IconButton
								color="primary"
								onClick={() => setOpen(!isOpen)}
							>
								<ArrowIcon
									fontSize="small"
									sx={iconSx(isOpen)}
								/>
							</IconButton>
						)
					) : (
						<Button
							variant="unstyled"
							sx={{ typography: 'R20', color: 'primary.main' }}
							onClick={() => setOpen(!isOpen)}
							endIcon={<ArrowIcon sx={iconSx(isOpen)} />}
						>
							История рекомендаций
						</Button>
					)
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
