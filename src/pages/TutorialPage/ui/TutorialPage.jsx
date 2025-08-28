import { Stack, Typography } from '@mui/material';
import { Dialogs } from 'entities/Chat';

const TutorialPage = () => {
	return (
		<Stack>
			<Typography variant="M40">Чаты</Typography>
			<Dialogs />
		</Stack>
	);
};

export default TutorialPage;
