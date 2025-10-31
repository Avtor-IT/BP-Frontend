import { IconButton, Stack, Typography } from '@mui/material';
import { useMarkDone } from 'entities/Chat';
import CheckCircleIcon from 'shared/icons/CheckCircle';
import { useMaxWidth } from 'shared/model';

export const RecommendationItem = ({ recommendation, slotProps, ...props }) => {
	const breakpoints = useMaxWidth();

	const markDone = useMarkDone();
	const handleMarkDone = (messageId, done) => {
		markDone.mutate({ messageId, done: done });
	};

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
				{recommendation.content}
			</Typography>
			<IconButton
				loading={markDone.isPending}
				sx={{ color: recommendation.done ? 'primary.main' : undefined }}
				onClick={() =>
					handleMarkDone(recommendation.id, !recommendation.done)
				}
			>
				<CheckCircleIcon />
			</IconButton>
		</Stack>
	);
};
