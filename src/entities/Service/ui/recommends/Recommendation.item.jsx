import { IconButton, Stack, Typography } from '@mui/material';
import CheckCircleIcon from 'shared/icons/CheckCircle';
import { RecommendationsHistory } from './Recommendations.history';

export const RecommendationItem = ({ recommendation, ...props }) => {
	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			alignItems="start"
			width="100%"
			gap={6}
		>
			<Typography
				variant="L20"
				paddingBlock={1}
				{...props}
			>
				{recommendation.description}
			</Typography>
			<IconButton>
				<CheckCircleIcon />
			</IconButton>
		</Stack>
	);
};
