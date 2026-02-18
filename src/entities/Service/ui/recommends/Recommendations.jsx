import {
	Button,
	Card,
	CardContent,
	CardHeader,
	IconButton,
} from '@mui/material';
import { useState } from 'react';
import ArrowIcon from 'shared/icons/Arrow';
import { useMaxWidth } from 'shared/model';
import { useDepartmentChat, useImportantMessages } from 'entities/Chat';
import { RecommendationItem } from './Recommendation.item';

const iconSx = (isOpen) => ({
	transform: `rotate(${isOpen ? '90deg' : '-90deg'})`,
	transition: 'all .1s ease',
	strokeWidth: 2,
});

export const Recommendations = ({ deparmentId }) => {
	const breakpoints = useMaxWidth();
	const [isOpen, setOpen] = useState(false);

	const { data: chat } = useDepartmentChat(deparmentId);
	const {
		data: recomendations,
		isLoading: isNotificationsLoading,
		isError: isNotificationsError,
	} = useImportantMessages(chat?.id);

	if (
		isNotificationsError ||
		isNotificationsLoading ||
		!recomendations ||
		recomendations.length === 0
	)
		return null;

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
					recomendations.map((r) => (
						<RecommendationItem
							key={r.id}
							recommendation={r}
						/>
					))
				) : (
					<RecommendationItem
						recommendation={recomendations[0]}
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
				)}
			</CardContent>
		</Card>
	);
};
