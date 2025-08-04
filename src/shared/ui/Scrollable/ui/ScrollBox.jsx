import { Box, Stack } from '@mui/material';
import { forwardRef } from 'react';

const ScrollBox = forwardRef(function ScrollBox(
	{ children, slotProps, ...props },
	ref
) {
	return (
		<Box
			ref={ref}
			flexGrow={1}
			position="relative"
			{...props}
		>
			<Stack
				position="absolute"
				overflow="auto"
				top={0}
				bottom={0}
				right={0}
				left={0}
				gap={1}
				pr={1}
				{...slotProps?.innerBox}
			>
				{children}
			</Stack>
		</Box>
	);
});

export default ScrollBox;
