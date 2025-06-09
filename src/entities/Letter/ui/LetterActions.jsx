import { Box, Button, Stack, Typography } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/system';
import { EditSquareIcon } from 'shared/icons/EditSqueare';
import { RefreshIcon } from 'shared/icons/Refresh';
import { TrashIcon } from 'shared/icons/Trash';
import { useBreakpoint } from 'shared/model/index.js';

const deleteAction = {
	actionName: 'Удалить из списка',
	actionShortName: 'Удалить',
	icon: <TrashIcon sx={{ width: '24px', height: '24px' }} />,
	color: 'tertiary',
};

const actionsByType = {
	draft: [
		{
			actionName: 'Редактирование',
			actionShortName: 'Исправить',
			icon: <EditSquareIcon sx={{ width: '24px', height: '24px' }} />,
			color: 'warning',
		},
		deleteAction,
	],
	formed: [
		{
			actionName: 'Повторить письмо',
			actionShortName: 'Повторить',
			icon: <RefreshIcon sx={{ width: '24px', height: '24px' }} />,
			color: 'success',
		},
		deleteAction,
	],
	sent: [
		{
			actionName: 'Повторить письмо',
			actionShortName: 'Повторить',
			icon: <RefreshIcon sx={{ width: '24px', height: '24px' }} />,
			color: 'success',
		},
		deleteAction,
	],
};

const LetterActions = ({ letter }) => {
	const theme = useTheme();
	const downXxxl = useMediaQuery(theme.breakpoints.down('xxxl'));
	const downXxl = useMediaQuery(theme.breakpoints.down('xxl'));

	const actions = actionsByType[letter.type];

	return (
		<Stack
			gap={1}
			justifyContent="space-between"
			height="100%"
		>
			<Stack
				flexGrow={1}
				sx={{
					justifyContent: 'center',
				}}
			>
				<Typography
					variant="M20"
					textAlign={downXxl && 'center'}
				>
					Действия
				</Typography>
			</Stack>

			{actions.map((action, index) => (
				<Button
					key={index}
					variant="card"
					sx={{
						justifyContent: 'start',
						gap: 2,
						color: `${action.color}.main`,
						'& span': {
							margin: 0,
						},
					}}
					startIcon={action.icon}
				>
					<Typography
						variant={downXxxl ? (downXxl ? 'M12' : 'M16') : 'M20'}
					>
						{downXxxl ? action.actionShortName : action.actionName}
					</Typography>
				</Button>
			))}
		</Stack>
	);
};

export default LetterActions;
