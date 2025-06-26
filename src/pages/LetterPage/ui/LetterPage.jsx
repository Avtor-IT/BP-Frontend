import { Grid } from '@mui/material';
import {
	LastLettersWidget,
	LetterConstructorCard,
	LettersListWidget,
} from 'entities/Letter';

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
					<LastLettersWidget height="100%" />
				</Grid>
				<Grid
					size={{ xxl: 2, xs: 5 }}
					order={{ xxl: 2, xs: 1 }}
				>
					<LetterConstructorCard sx={{ height: '100%' }} />
				</Grid>
			</Grid>

			<Grid size={{ xxxl: 4, xs: 5 }}>
				<LettersListWidget />
			</Grid>
		</Grid>
	);
};

export default LetterPage;
