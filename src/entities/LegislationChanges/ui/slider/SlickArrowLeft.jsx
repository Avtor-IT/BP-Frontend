import { IconButton } from '@mui/material';
import { ArrowInCircle } from 'shared/icons/ArrowInCircle';

const SlickArrowLeft = ({ slideCount: _, currentSlide, ...props }) => {
	return (
		<IconButton
			{...props}
			aria-hidden="true"
			disabled={currentSlide === 0}
			sx={{
				p: 0,
				'&:before': { display: 'none' },
				color: 'secondary.contrastText',
				transform: 'scaleX(-1) translate(0, calc(-100% - 28px));',
				'&:hover': { color: 'secondary.contrastText' },
				position: 'absolute',
				left: 'auto',
				top: 0,
				right: 'calc(32px + 4px)',
				width: '32px',
				height: '32px',
				zIndex: 2,
			}}
		>
			<ArrowInCircle
				sx={{
					height: '32px',
					width: '32px',
				}}
				strokeWidth={2}
			/>
		</IconButton>
	);
};

export default SlickArrowLeft;
