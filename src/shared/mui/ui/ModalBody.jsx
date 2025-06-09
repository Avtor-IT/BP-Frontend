import { Box } from '@mui/material';
import { forwardRef } from 'react';

const styles = {
	borderRadius: 2,
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	// background: 'background',
	// p: '32px 24px',
};

const ModalBody = forwardRef(function ModalBody(
	{ sx, children, ...props },
	ref
) {
	return (
		<Box
			ref={ref}
			sx={{ ...styles, ...sx }}
			{...props}
		>
			{children}
		</Box>
	);
});

export default ModalBody;
