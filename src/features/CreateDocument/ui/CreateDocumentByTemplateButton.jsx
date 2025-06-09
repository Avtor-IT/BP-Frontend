import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { AppRoutes, createRoute } from 'shared/router';

const CreateDocumentByTemplateButton = () => {
	return (
		<Button
			component={Link}
			to={createRoute(AppRoutes.LETTER)}
			variant="outlined"
			color="tertriary"
			sx={{
				borderWidth: '2px',
				borderRadius: '16px',
				boxShadow: '0 1px 2px 0 #00000010, 0 0px 3px 1px #0000001F',
				paddingInline: 3,
				paddingBlock: 2,
			}}
		>
			<Typography
				variant="M20"
				color="textSecondary"
			>
				Заполнить бланк
			</Typography>
		</Button>
	);
};

export default CreateDocumentByTemplateButton;
