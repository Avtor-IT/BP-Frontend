import { MenuItem, Select } from '@mui/material';
import { useMaxWidth } from 'shared/model';

const LettersFilter = () => {
	const breakpoints = useMaxWidth();

	return (
		<Select
			label="Состояние"
			variant="filled"
			value="all"
			sx={{ typography: breakpoints.xl ? 'M16' : 'M20' }}
		>
			<MenuItem value="all">Состояние</MenuItem>
			<MenuItem value="formed">Сформировано</MenuItem>
			<MenuItem value="draft">Черновик</MenuItem>
			<MenuItem value="sent">Отправлено</MenuItem>
		</Select>
	);
};

export default LettersFilter;
