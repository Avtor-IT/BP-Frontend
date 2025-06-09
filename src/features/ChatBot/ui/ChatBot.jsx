import SearchIcon from 'shared/icons/Search';
import { Button, Input, InputAdornment } from '@mui/material';
import { useMinWidth } from 'shared/model';

export const ChatBot = () => {
	const breakpoints = useMinWidth();

	return breakpoints.lg ? (
		<Button
			variant="card"
			sx={{ paddingBlock: 1.5, minWidth: 'auto' }}
		>
			<SearchIcon
				fontSize="small"
				sx={(theme) => ({
					color: theme.palette.secondary.main,
				})}
			/>
		</Button>
	) : (
		<Input
			variant="card"
			placeholder="Чат бот"
			startAdornment={
				<InputAdornment position="start">
					<SearchIcon
						fontSize={breakpoints.xxl ? 'small' : 'medium'}
						sx={(theme) => ({
							color: theme.palette.secondary.main,
						})}
					/>
				</InputAdornment>
			}
			sx={(theme) => ({
				...theme.typography[breakpoints.xxl ? 'R16' : 'R20'],
				color: theme.palette.secondary.main,
				lineHeight: 0.5,
				minWidth: '0',
				width: 'auto',
				borderRadius: '8px',
				paddingBlock: breakpoints.xxl ? '10px' : undefined,
			})}
		/>
	);
};
