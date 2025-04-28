import { Button, Stack } from '@mui/material';
import { UpDownIcon } from 'shared/icons/UpDown';

const LettersSort = () => {
	return (
		<Button
			variant="card"
			sx={{ borderRadius: '8px' }}
		>
			<Stack
				direction="row"
				gap={2}
				alignItems="center"
			>
				Дата
				<UpDownIcon />
			</Stack>
		</Button>
	);
};

export default LettersSort;
