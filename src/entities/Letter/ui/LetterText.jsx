import { Box, Card, IconButton, Stack, Typography } from '@mui/material';
import { ExpandIcon } from 'shared/icons/Expand';

const LetterText = () => {
	return (
		<Card sx={{ height: '100%' }}>
			<Stack
				position="relative"
				height="100%"
			>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					paddingTop={4}
					paddingInline={3}
				>
					<Typography
						variant="M20"
						color="textSecondary"
					>
						Текст письма:
					</Typography>

					<IconButton>
						<ExpandIcon />
					</IconButton>
				</Stack>

				<Box
					overflow="hidden"
					flexGrow={1}
					position={'relative'}
					paddingBottom={3}
				>
					<Box
						height="100%"
						position={'relative'}
					>
						{/* Gradient */}
						<Box
							sx={{
								background:
									'linear-gradient(180deg,rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);',
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								marginInline: 3,
								height: '20px',
								zIndex: 1,
							}}
						/>

						{/* Content */}
						<Box
							sx={{
								overflowY: 'auto',
								position: 'absolute',
								width: '100%',
								height: '100%',
								paddingInline: 3,
								paddingBlock: 2,
							}}
						>
							<Typography
								variant="M16"
								color="tertiary.main"
							>
								Lorem ipsum dolor sit, amet consectetur
								adipisicing elit. Ut earum molestias harum
								ratione architecto. Optio magnam officia harum
								cupiditate vel dolore voluptatum error,
								distinctio ullam fugit animi alias voluptatibus
								itaque. Fuga, corporis eos. Delectus deleniti
								voluptatum et magni, sit inventore tempore minus
								laborum quia! Rerum ipsum nemo quo aspernatur
								quasi harum consequuntur, repudiandae, quam
								itaque accusamus, possimus illo soluta incidunt.
							</Typography>
						</Box>

						{/* Gradient */}
						<Box
							sx={{
								background:
									'linear-gradient(0deg,rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);',

								position: 'absolute',
								bottom: 0,
								left: 0,
								right: 0,
								height: '20px',
								marginInline: 3,
								zIndex: 1,
							}}
						/>
					</Box>
				</Box>
			</Stack>
		</Card>
	);
};

export default LetterText;
