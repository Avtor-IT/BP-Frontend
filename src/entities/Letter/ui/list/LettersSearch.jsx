import { Input } from '@mui/material';
import { useMaxWidth } from 'shared/model';

const LettersSearch = () => {
	const breakpoints = useMaxWidth();

	return (
		<Input
			placeholder="Поиск"
			fullWidth
			sx={{
				p: breakpoints.xl ? 1 : undefined,
				typography: breakpoints.xl ? 'R16' : 'R20',
				borderRadius: breakpoints.xl ? 2 : undefined,
			}}
			variant="card"
		/>
	);
};

export default LettersSearch;
