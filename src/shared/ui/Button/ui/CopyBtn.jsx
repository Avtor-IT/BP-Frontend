import { Box, Snackbar } from '@mui/material';
import { useState } from 'react';

const CopyBtn = ({
	children,
	textToCopy,
	snackabarProps,
	sx,
	...otherProps
}) => {
	const [openSnackbar, setOpen] = useState(false);

	const handleCopy = () => {
		if (textToCopy) {
			navigator.clipboard.writeText(textToCopy).then(() => {
				setOpen(true);
			});
		}
	};

	const handleClose = (reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	return (
		<>
			<Box
				onClick={handleCopy}
				{...otherProps}
				sx={{ cursor: 'pointer', ...sx }}
			>
				{children}
			</Box>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={3000}
				onClose={handleClose}
				message="Текст скопирован"
				{...snackabarProps}
			/>
		</>
	);
};

export default CopyBtn;
