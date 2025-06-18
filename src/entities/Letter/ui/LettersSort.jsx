import { Button, Stack } from '@mui/material';
import { UpDownIcon } from 'shared/icons/UpDown';
import { useMaxWidth } from 'shared/model';

const LettersSort = () => {
	const breakpoints = useMaxWidth();

	return (
		<Button
			variant="card"
			sx={{ borderRadius: '8px' }}
		>
			<Stack
				direction="row"
				gap={2}
				alignItems="center"
				sx={(theme) =>
					breakpoints.xl
						? {
								...theme.typography['M16'],
						  }
						: { ...theme.typography['M20'] }
				}
			>
				Дата
				<UpDownIcon />
			</Stack>
		</Button>
	);
};

export default LettersSort;
