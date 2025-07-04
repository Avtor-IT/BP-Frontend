import { Box } from '@mui/material';

const OFFSET_X = '-25px';
const OFFSET_Y = '38px';

const circle = {
	aspectRatio: '1/1',
	borderRadius: '100%',
};

const positioned = (fullWidth) => ({
	right: fullWidth ? '-50%' : '-85%',
	left: fullWidth ? '-95%' : '-75%',
	bottom: 0,
	zIndex: 1,
	position: 'absolute',
	transform: `translate(${OFFSET_X}, ${OFFSET_Y})`,
});

const CircledTitle = ({
	title,
	color,
	textColor,
	slotProps,
	fullWidth,
	...props
}) => {
	return (
		<Box
			{...props}
			sx={{
				position: 'relative',
				display: 'inline-block',
				marginBottom: OFFSET_Y,
				width: fullWidth ? '100%' : undefined,
				...props.sx,
			}}
		>
			<Box
				{...slotProps?.circle}
				sx={{
					...circle,
					...positioned(fullWidth),
					backgroundColor: color || 'primary.main',
					...slotProps?.circle?.sx,
				}}
			/>
			<Box
				component="span"
				{...slotProps?.content}
				sx={{
					zIndex: 2,
					position: 'relative',
					color: textColor || 'primary.contrastText',
					...slotProps?.content?.sx,
				}}
			>
				{title}
			</Box>
		</Box>
	);
};

export default CircledTitle;
