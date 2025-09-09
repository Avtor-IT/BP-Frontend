import { IconButton, Stack, Typography } from '@mui/material';
import CheckCircleIcon from 'shared/icons/CheckCircle';
import { RecommendationsHistory } from './Recommendations.history';
import { useMaxWidth } from 'shared/model';

export const RecommendationItem = ({ recommendation, slotProps, ...props }) => {
	const breakpoints = useMaxWidth();

	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			alignItems="start"
			width="100%"
			gap={6}
			{...slotProps?.root}
			{...props}
		>
			<Typography
				variant={breakpoints.xs ? 'L16' : 'L20'}
				paddingBlock={1}
				{...slotProps?.typography}
			>
				{recommendation.description}
			</Typography>
			<IconButton>
				<CheckCircleIcon />
			</IconButton>
		</Stack>
	);
};
