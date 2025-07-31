import { Button, IconButton } from '@mui/material';
import AddSquareIcon from 'shared/icons/AddSquare';
import { useMaxWidth } from 'shared/model';

const AddEmployee = () => {
	const breakpoints = useMaxWidth();

	if (breakpoints.md) {
		return (
			<IconButton>
				<AddSquareIcon
					strokeWidth={2}
					sx={{ width: '24px', height: '24px' }}
				/>
			</IconButton>
		);
	}

	return (
		<Button
			variant="unstyled"
			endIcon={
				<AddSquareIcon
					strokeWidth={2}
					sx={{ width: '24px', height: '24px' }}
				/>
			}
			color="secondary"
			sx={{
				typography: breakpoints.xl ? 'R12' : 'R16',
				alignItems: 'center',
				paddingInline: 1,
				color: 'secondary.main',
				'& span': {
					marginRight: 0,
				},
			}}
		>
			Добавить сотрудника
		</Button>
	);
};

export default AddEmployee;
