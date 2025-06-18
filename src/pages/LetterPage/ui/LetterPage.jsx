import { Grid, Stack } from '@mui/material';
import {
	LastLettersWidget,
	LastLettersWidgetLg,
	LettersFilter,
	LettersList,
	LettersSearch,
	LettersSort,
} from 'entities/Letter';
import { BreakpointedComponent } from 'shared/model';
import { CreateNewLetterCard } from 'widgets/CreateNewLetterCard';

const LetterPage = () => {
	return (
		<Grid
			container
			columns={5}
			rowSpacing={{ xxl: 9, xl: 7, md: 4, xs: 7 }}
		>
			<Grid
				size={5}
				container
				columns={5}
				columnSpacing={2}
				rowSpacing={2}
			>
				<Grid
					size={{ xxl: 3, xs: 5 }}
					order={{ xxl: 1, xs: 2 }}
				>
					<BreakpointedComponent
						components={{
							default: LastLettersWidget,
							lg: LastLettersWidgetLg,
						}}
						componentProps={{ height: '100%' }}
					/>
				</Grid>
				<Grid
					size={{ xxl: 2, xs: 5 }}
					order={{ xxl: 2, xs: 1 }}
				>
					<CreateNewLetterCard sx={{ height: '100%' }} />
				</Grid>
			</Grid>

			<Grid size={{ xxxl: 4, xs: 5 }}>
				<Stack
					gap={{ xl: 4, xs: 3 }}
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
