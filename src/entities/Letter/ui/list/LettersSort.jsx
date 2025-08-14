import { Button } from '@mui/material';
import { UpDownIcon } from 'shared/icons/UpDown';

const LettersSort = () => {
	return (
		<Button
			variant="card"
			sx={{ borderRadius: '8px', color: 'tertiary.dark', gap: 1 }}
			endIcon={<UpDownIcon sx={{ strokeWidth: 2 }} />}
		>
			Дата
		</Button>
	);
};

export default LettersSort;
