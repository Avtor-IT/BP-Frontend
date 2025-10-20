import { Card, IconButton, Stack, Typography } from '@mui/material';
import { ExpandIcon } from 'shared/icons/Expand';
import { useMaxWidth } from 'shared/model';
import { FadedScrollBox } from 'shared/ui/Scrollable';

const LetterText = ({ text }) => {
	const breakpoints = useMaxWidth();

	return (
		<Card
			sx={{
				height: '100%',
				paddingBottom: breakpoints.xl ? 0 : undefined,
				paddingBlock: breakpoints.lg ? 2 : undefined,
				borderRadius: breakpoints.lg ? 2 : undefined,
			}}
		>
			<Stack
				position="relative"
				height="100%"
			>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					paddingInline={breakpoints.lg ? 2 : 3}
				>
					<Typography
						variant={breakpoints.xl ? 'M16' : 'M20'}
						color="textSecondary"
					>
						Текст письма:
					</Typography>

					<IconButton sx={{ padding: 0 }}>
						<ExpandIcon />
					</IconButton>
				</Stack>

				{!breakpoints.lg ? (
					<FadedScrollBox flexGrow={1}>
						<Typography
							variant="M16"
							color="tertiary.main"
						>
							{text}
						</Typography>
					</FadedScrollBox>
				) : null}
			</Stack>
		</Card>
	);
};

export default LetterText;
