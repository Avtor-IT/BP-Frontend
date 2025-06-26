import { Button, Typography } from '@mui/material';

const ModalActionButton = ({ text, ...props }) => {
	return (
		<Button
			color="secondary"
			variant="contained"
			{...props}
			sx={{ padding: '16px 32px', ...props.sx }}
		>
			<Typography
				variant="M20"
				lineHeight={1}
			>
				{text}
			</Typography>
		</Button>
	);
};

export default ModalActionButton;
