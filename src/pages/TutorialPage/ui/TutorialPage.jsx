import { Stack, Typography } from '@mui/material';
import { Dialogs } from 'entities/Chat';

const TutorialPage = () => {
	return (
		<Stack>
			<Typography variant="M40">Tutorial page</Typography>
			<Dialogs />
		</Stack>
	);
};

export default TutorialPage;
