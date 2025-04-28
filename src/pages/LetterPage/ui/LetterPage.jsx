import { Stack } from '@mui/material';
import { Grid } from '@mui/system';
import {
	LettersFilter,
	LettersList,
	LettersSearch,
	LettersSort,
} from 'entities/Letter';
import { CreateNewLetterCard } from 'widgets/CreateNewLetterCard';
import { LastLettersCard } from 'widgets/LastLettersCard';

const LetterPage = () => {
	return (
		<Grid
			container
			columns={5}
			columnSpacing={2}
			rowSpacing={9}
		>
			<Grid size={3}>
				<LastLettersCard height="100%" />
			</Grid>
			<Grid size={2}>
				<CreateNewLetterCard sx={{ height: '100%' }} />
			</Grid>

			<Grid size={4}>
				<Stack
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
