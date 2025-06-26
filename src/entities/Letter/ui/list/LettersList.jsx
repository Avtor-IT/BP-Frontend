import { Skeleton, Stack, Typography } from '@mui/material';
import { Grid } from '@mui/system';
import useLetters from '../../api/getLetters';
import LetterActions from '../letter-item/LetterActions';
import LetterCard from '../letter-item/LetterCard';
import LetterText from '../letter-item/LetterText';

const LettersList = () => {
	const { data: letters, isLoading, isError } = useLetters();

	if (isLoading) {
		return (
			<Stack
				gap={3}
				width="100%"
			>
				{Array.from({ length: 3 }).map((letter, i) => (
					<Grid
						key={i}
						container
						columns={4}
						columnSpacing={2}
					>
						<Grid size={1}>
							<Skeleton
								variant="rounded"
								height="180px"
							/>
						</Grid>
						<Grid size={2}>
							<Skeleton
								variant="rounded"
								height="180px"
							/>
						</Grid>
						<Grid size={1}>
							<Skeleton
								variant="rounded"
								height="180px"
							/>
						</Grid>
					</Grid>
				))}
			</Stack>
		);
	}
	if (isError) {
		return (
			<Stack
				gap={3}
				width="100%"
				alignItems="center"
				justifyContent="center"
				padding={2}
			>
				<Typography
					color="error"
					variant="M20"
				>
					Ошибка при получении писем
				</Typography>
			</Stack>
		);
	}

	return (
		<Stack
			gap={3}
			width="100%"
		>
			{letters.map((letter, i) => (
				<Grid
					key={i}
					container
					columns={{ xxxl: 4, lg: 5, md: 3, xs: 2 }}
					columnSpacing={2}
					rowSpacing={1}
				>
					<Grid size={{ xxxl: 1, xs: 2 }}>
						<LetterCard letter={letter} />
					</Grid>
					<Grid
						size={{ lg: 2, xs: 3 }}
						order={{ lg: 2, xs: 3 }}
					>
						<LetterText />
					</Grid>
					<Grid
						size={{ md: 1, xs: 2 }}
						order={{ lg: 3, xs: 2 }}
					>
						<LetterActions letter={letter} />
					</Grid>
				</Grid>
			))}
		</Stack>
	);
};

export default LettersList;
