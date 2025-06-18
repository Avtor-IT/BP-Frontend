import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowIcon from 'shared/icons/Arrow';

const DocumentsLink = ({ title, ...props }) => {
	return (
		<Button
			variant="outlined"
			color="secondary"
			fullWidth
			sx={{
				borderRadius: 2,
				justifyContent: 'space-between',
				height: 56,
			}}
			endIcon={<ArrowIcon color="secondary.main" />}
			component={Link}
			{...props}
		>
			<Typography
				variant="M20"
				color="secondary.main"
			>
				{title}
			</Typography>
		</Button>
	);
};

export default DocumentsLink;
