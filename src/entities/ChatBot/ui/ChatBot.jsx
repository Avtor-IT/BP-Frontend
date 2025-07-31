import { Button, Input, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { ArrowEnterIcon } from 'shared/icons/ArrowEnter';
import SearchIcon from 'shared/icons/Search';
import { useMaxWidth } from 'shared/model';

export const ChatBot = () => {
	const breakpoints = useMaxWidth();
	const [isFocus, setFocus] = useState(false);

	if (breakpoints.lg) {
		return (
			<Button
				variant="card"
				sx={{
					paddingBlock: 1.5,
					minWidth: breakpoints.md ? 'min(100px, 100%)' : 'auto',
				}}
			>
				<SearchIcon
					fontSize="small"
					sx={(theme) => ({
						color: theme.palette.secondary.main,
					})}
				/>
			</Button>
		);
	}

	return (
		<Input
			variant="card"
			placeholder="Чат бот"
			onFocus={() => setFocus(true)}
			onBlur={() => setFocus(false)}
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
			endAdornment={
				isFocus && (
					<InputAdornment position="end">
						<ArrowEnterIcon
							fontSize={breakpoints.xxl ? 'small' : 'medium'}
						/>
					</InputAdornment>
				)
			}
			sx={(theme) => ({
				...theme.typography[breakpoints.xxl ? 'R16' : 'R20'],
				color: theme.palette.secondary.main,
				lineHeight: 0.5,
				minWidth: isFocus ? 650 : 0,
				width: 'auto',
				borderRadius: '8px',
				paddingBlock: breakpoints.xxl ? '10px' : undefined,
				transition: 'all .2s ease',
			})}
		/>
	);
};
