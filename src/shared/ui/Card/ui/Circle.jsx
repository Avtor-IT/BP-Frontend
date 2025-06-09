import { Box } from '@mui/material';

const Circle = ({ width, height, size, sx, ...otherProps }) => {
	return (
		<Box
			width={width || size || '678px'}
			height={height || size || '678px'}
			sx={(theme) => ({
				position: 'absolute',
				zIndex: 1,
				borderRadius: '100%',
				transition: 'all 0.3s ease',
				background: theme.palette.primary.main,
				...sx,
			})}
			{...otherProps}
		/>
	);
};

export default Circle;
