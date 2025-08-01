import { Card, IconButton, Stack, Typography } from '@mui/material';
import { ExpandIcon } from 'shared/icons/Expand';
import { useMaxWidth } from 'shared/model';
import { FadedScrollBox } from 'shared/ui/Scrollable';

const LetterText = () => {
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

				{breakpoints.lg || (
					<FadedScrollBox flexGrow={1}>
						<Typography
							variant="M16"
							color="tertiary.main"
						>
							Lorem ipsum dolor sit, amet consectetur adipisicing
							elit. Ut earum molestias harum ratione architecto.
							Optio magnam officia harum cupiditate vel dolore
							voluptatum error, distinctio ullam fugit animi alias
							voluptatibus itaque. Fuga, corporis eos. Delectus
							deleniti voluptatum et magni, sit inventore tempore
							minus laborum quia! Rerum ipsum nemo quo aspernatur
							quasi harum consequuntur, repudiandae, quam itaque
							accusamus, possimus illo soluta incidunt.
						</Typography>
					</FadedScrollBox>
				)}
			</Stack>
		</Card>
	);
};

export default LetterText;
