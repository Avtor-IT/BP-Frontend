import { IconButton } from '@mui/material';
import { ArrowInCircle } from 'shared/icons/ArrowInCircle';

const SlickArrowRight = ({
	currentSlide,
	slideCount,
	slidesToShow,
	...props
}) => (
	<IconButton
		{...props}
		sx={{
			p: 0,
			'&:hover': { color: 'secondary.contrastText' },
			'&:before': { display: 'none' },
			color: 'secondary.contrastText',
			transform: 'translate(0, calc(-100% - 28px))',
			position: 'absolute',
			top: 0,
			right: 0,
			width: '32px',
			height: '32px',
			zIndex: 2,
		}}
		aria-hidden="true"
		disabled={currentSlide === slideCount - slidesToShow}
	>
		<ArrowInCircle
			sx={{ height: '32px', width: '32px' }}
			strokeWidth={2}
		/>
	</IconButton>
);

export default SlickArrowRight;
