import { Box, Stack } from '@mui/material';

const ScrollBox = ({ children, slotProps, ...props }) => {
	return (
		<Box
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
};

export default ScrollBox;
