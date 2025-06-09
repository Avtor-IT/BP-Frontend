import { Skeleton, Stack, Typography } from '@mui/material';
import { Grid } from '@mui/system';
import useLetters from '../api/getLetters';
import LetterActions from './LetterActions';
import LetterCard from './LetterCard';
import LetterText from './LetterText';

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
					Ошибка при получении писем :\
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
					columns={{ xxxl: 4, xs: 5 }}
					columnSpacing={2}
				>
					<Grid size={{ xxxl: 1, xs: 2 }}>
						<LetterCard letter={letter} />
					</Grid>
					<Grid size={2}>
						<LetterText />
					</Grid>
					<Grid size={1}>
						<LetterActions letter={letter} />
					</Grid>
				</Grid>
			))}
		</Stack>
	);
};

export default LettersList;
