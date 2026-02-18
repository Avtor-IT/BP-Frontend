import { Box, Modal as MuiModal } from '@mui/material';

const boxStyle = {
	paddingBlock: 2,
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 800,
	minHeight: 250,
	maxHeight: '92vh',
	display: 'flex',
	outline: 'none',
};

const style = {
	bgcolor: 'background.paper',
	boxShadow: 24,
	borderRadius: '8px',
	overflow: 'auto',
	flexGrow: 1,
	p: 2,
};

export const Modal = ({ open, onClose, children }) => {
	return (
		<MuiModal
			open={open}
			onClose={onClose}
		>
			<Box sx={{ ...boxStyle, ...style }}>{children}</Box>
		</MuiModal>
	);
};
