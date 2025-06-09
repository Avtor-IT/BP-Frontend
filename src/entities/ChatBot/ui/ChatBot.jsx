import SearchIcon from 'shared/icons/Search';
import { Input, InputAdornment } from '@mui/material';

export const ChatBot = () => {
	return (
		<Input
			variant="card"
			color="secondary"
			startAdornment={
				<InputAdornment position="start">
					<SearchIcon />
				</InputAdornment>
			}
			inputProps={{ placeholder: 'Чат бот' }}
		/>
	);
};
