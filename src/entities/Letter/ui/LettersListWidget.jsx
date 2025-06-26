import { Stack } from '@mui/material';
import LettersFilter from './list/LettersFilter';
import LettersList from './list/LettersList';
import LettersSearch from './list/LettersSearch';
import LettersSort from './list/LettersSort';

const LettersListWidget = () => {
	return (
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
	);
};

export default LettersListWidget;
