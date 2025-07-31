import { Stack, Typography } from '@mui/material';
import { createAdditioinalSx } from 'shared/mui';

const colorByStatus = {
	'Ожидает подписания': 'primary',
	Подписан: 'success',
	'В обработке': 'warning',
};

const DocItem = ({ document, slotProps = {} }) => {
	return (
		<Stack
			component="button"
			{...slotProps.box}
			sx={createAdditioinalSx(
				{
					cursor: 'pointer',
					boxSizing: 'border-box',
					border: `2px solid`,
					borderColor: `${colorByStatus[document.status]}.main`,
					borderRadius: 4,
					justifyContent: 'space-between',
					p: 2,
					gap: 1,
					flex: '1 1 0',
				},
				slotProps?.box?.sx
			)}
		>
			<Typography variant="M16">{document.name}</Typography>
			<Typography
				variant="M16"
				color={colorByStatus[document.status]}
			>
				{document.status}
			</Typography>
		</Stack>
	);
};

export default DocItem;
