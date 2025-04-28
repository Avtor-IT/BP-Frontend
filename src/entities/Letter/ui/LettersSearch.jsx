import { Input } from '@mui/material';

const LettersSearch = () => {
	return (
		<Input
			inputProps={{ placeholder: 'Поиск' }}
			fullWidth
			variant="card"
		/>
	);
};

export default LettersSearch;
