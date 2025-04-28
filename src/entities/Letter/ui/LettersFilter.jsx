import { MenuItem, Select } from '@mui/material';

const LettersFilter = () => {
	return (
		<Select
			label="Состояние"
			variant="filled"
			value="all"
		>
			<MenuItem value="all">Состояние</MenuItem>
			<MenuItem value="formed">Сформировано</MenuItem>
			<MenuItem value="draft">Черновик</MenuItem>
			<MenuItem value="sent">Отправлено</MenuItem>
		</Select>
	);
};

export default LettersFilter;
