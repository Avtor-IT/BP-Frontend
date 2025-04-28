import { Box, Button, Stack, Typography } from '@mui/material';
import { EditSquareIcon } from 'shared/icons/EditSqueare';
import { RefreshIcon } from 'shared/icons/Refresh';
import { TrashIcon } from 'shared/icons/Trash';

const LetterActions = ({ letter }) => {
	return (
		<Stack
			gap={1}
			justifyContent="space-between"
			height="100%"
		>
			<Box flexGrow={1}>
				<Typography variant="M20">Действия</Typography>
			</Box>
			{letter.type === 'draft' ? (
				<Button
					variant="card"
					sx={{
						justifyContent: 'start',
						gap: 2,
						color: 'warning.main',
						'& span': {
							margin: 0,
						},
					}}
					startIcon={
						<EditSquareIcon
							sx={{ width: '24px', height: '24px' }}
						/>
					}
				>
					Редактирование
				</Button>
			) : (
				<Button
					variant="card"
					sx={{
						justifyContent: 'start',
						gap: 2,
						color: 'success.main',
						'& span': {
							margin: 0,
						},
					}}
					startIcon={
						<RefreshIcon sx={{ width: '24px', height: '24px' }} />
					}
				>
					Повторить письмо
				</Button>
			)}

			<Button
				variant="card"
				sx={{
					justifyContent: 'start',
					gap: 2,
					'& span': {
						margin: 0,
					},
				}}
				startIcon={<TrashIcon sx={{ width: '24px', height: '24px' }} />}
			>
				Удалить из списка
			</Button>
		</Stack>
	);
};

export default LetterActions;
