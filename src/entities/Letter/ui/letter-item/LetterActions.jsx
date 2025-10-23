import { Button, Stack, Typography } from '@mui/material';
import { useLeterModalStore } from '../../store/letterModalStore';
import { EditSquareIcon } from 'shared/icons/EditSqueare';
import { RefreshIcon } from 'shared/icons/Refresh';
import { TrashIcon } from 'shared/icons/Trash';
import { useMaxWidth } from 'shared/model/index.js';
import { useLetterStore } from '../../store/letterStore';

const LetterActions = ({ letter }) => {
	const breakpoints = useMaxWidth();
	const { handleOpen } = useLeterModalStore();
	const { setLetter } = useLetterStore();

	const deleteAction = {
		actionName: 'Удалить из списка',
		actionShortName: 'Удалить',
		icon: <TrashIcon sx={{ width: '24px', height: '24px' }} />,
		color: 'tertiary',
	};
	const editAction = {
		actionName: 'Редактирование',
		actionShortName: 'Исправить',
		icon: <EditSquareIcon sx={{ width: '24px', height: '24px' }} />,
		color: 'warning',
	};
	const repeatAction = {
		actionName: 'Повторить письмо',
		actionShortName: 'Повторить',
		icon: <RefreshIcon sx={{ width: '24px', height: '24px' }} />,
		color: 'success',
		action: (letter) => {
			setLetter(letter.content);
			handleOpen();
		},
	};

	const actionsByType = (isDraft) => {
		if (isDraft) return [editAction, deleteAction];

		return [repeatAction, deleteAction];
	};

	const actions = actionsByType(letter.is_draft);

	return (
		<Stack
			gap={1}
			justifyContent="space-between"
			height="100%"
			direction={breakpoints.md ? 'row' : 'column'}
		>
			{!breakpoints.md ? (
				<Stack
					flexGrow={1}
					sx={{
						justifyContent: 'center',
					}}
				>
					<Typography
						variant="M20"
						textAlign={breakpoints.xxl && 'center'}
					>
						Действия
					</Typography>
				</Stack>
			) : null}

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
						borderRadius: breakpoints.xl ? 2 : undefined,
						flex: breakpoints.md ? '1 1 50%' : undefined,
					}}
					onClick={() => action.action?.(letter)}
					startIcon={action.icon}
				>
					<Typography
						variant={
							breakpoints.xxxl
								? breakpoints.xxl
									? 'M12'
									: 'M16'
								: 'M20'
						}
					>
						{breakpoints.xxxl
							? action.actionShortName
							: action.actionName}
					</Typography>
				</Button>
			))}
		</Stack>
	);
};

export default LetterActions;
