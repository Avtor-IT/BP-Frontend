import { Stack, Grid } from '@mui/material';
import {
	LastLettersWidget,
	LettersFilter,
	LettersList,
	LettersSearch,
	LettersSort,
} from 'entities/Letter';
import { CreateNewLetterCard } from 'widgets/CreateNewLetterCard';

const LetterPage = () => {
	return (
		<Grid
			container
			columns={5}
			columnSpacing={2}
			rowSpacing={2}
			paddingBottom={3}
		>
			<Grid
				size={{ xxl: 3, xs: 5 }}
				order={{ xxl: 1, xs: 2 }}
			>
				<LastLettersWidget height="100%" />
			</Grid>
			<Grid
				size={{ xxl: 2, xs: 5 }}
				order={{ xxl: 2, xs: 1 }}
			>
				<CreateNewLetterCard sx={{ height: '100%' }} />
			</Grid>

			<Grid
				size={{ xxxl: 4, xs: 5 }}
				order={3}
			>
				<Stack
					paddingTop={{ xxl: 7, xl: 5, xs: 2 }}
					gap={4}
					alignItems="start"
				>
					<LettersSearch />

					<Stack
						direction="row"
						gap={1}
					>
						<LettersSort />
						<LettersFilter />
					</Stack>

					<LettersList />
				</Stack>
			</Grid>
		</Grid>
	);
};

export default LetterPage;
