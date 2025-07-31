import { Box } from '@mui/material';
import { cloneElement } from 'react';
import { createAdditioinalSx } from 'shared/mui';

const OverflowedText = ({ children, gradientColor = 'white', ...props }) => {
	return (
		<Box
			{...props}
			sx={createAdditioinalSx(
				{
					overflow: 'hidden',
					position: 'relative',
					'&:after': {
						content: '""',
						textAlign: 'right',
						position: 'absolute',
						bottom: 0,
						top: 0,
						right: 0,
						width: '20%',
						background: `linear-gradient(to right, rgba(255, 255, 255, 0), ${gradientColor} 100%)`,
						pointerEvents: 'none',
					},
				},
				props.sx
			)}
		>
			{cloneElement(children, {
				...children.props,
				style: {
					whiteSpace: 'nowrap',
					...children.props?.style,
				},
			})}
		</Box>
	);
};

export default OverflowedText;
