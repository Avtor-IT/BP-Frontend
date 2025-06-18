import { Input } from '@mui/material';
import { useMaxWidth } from 'shared/model';

const LettersSearch = () => {
	const breakpoints = useMaxWidth();

	return (
		<Input
			placeholder="Поиск"
			fullWidth
			sx={(theme) => ({
				'& .MuiInputBase-input::placeholder': breakpoints.xl
					? {
							...theme.typography['M16'],
					  }
					: { ...theme.typography['M20'] },
				p: breakpoints.xl ? 1 : undefined,
				borderRadius: breakpoints.xl ? 2 : undefined,
			})}
			variant="card"
		/>
	);
};

export default LettersSearch;
