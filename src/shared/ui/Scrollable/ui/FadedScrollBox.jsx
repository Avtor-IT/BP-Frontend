import { Box } from '@mui/material';

const gradientBg = (
	deg = 0,
	startColor = 'rgba(255, 255, 255, 1)',
	endColor = 'rgba(255, 255, 255, 0)'
) => `linear-gradient(${deg}deg, ${startColor} 0%, ${endColor} 100%);`;

const FadedScrollBox = ({ children, offsetX = 3, offsetY = 2, ...props }) => {
	return (
		<Box
			overflow="hidden"
			position="relative"
			{...props}
		>
			<Box
				height="100%"
				position="relative"
			>
				{/* Gradient */}
				<Box
					sx={{
						background: gradientBg(180),
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						marginInline: offsetX,
						height: offsetY * 8,
						zIndex: 1,
					}}
				/>

				{/* Content */}
				<Box
					sx={{
						overflowY: 'auto',
						position: 'absolute',
						width: '100%',
						height: '100%',
						paddingInline: offsetX,
						paddingBlock: offsetY,
					}}
				>
					{children}
				</Box>

				{/* Gradient */}
				<Box
					sx={{
						background: gradientBg(),
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0,
						height: offsetY * 8,
						marginInline: offsetX,
						zIndex: 1,
					}}
				/>
			</Box>
		</Box>
	);
};

export default FadedScrollBox;
