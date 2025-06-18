import { IconButton } from '@mui/material';
import { ArrowInCircle } from 'shared/icons/ArrowInCircle';

const ArrowRight = ({ currentSlide, slideCount, slidesToShow, ...props }) => (
	<IconButton
		{...props}
		sx={{
			p: 0,
			'&:before': { display: 'none' },
			transform: 'none',
			position: 'absolute',
			left: 'auto',
			right: '-76px',
			top: '100px',
			width: '32px',
			height: '32px',
			zIndex: 2,
			color: 'secondary.main',
			'&:focus, &:hover': {
				color: 'secondary.main',
			},
			...props.sx,
		}}
		disabled={currentSlide === slideCount - slidesToShow}
	>
		<ArrowInCircle
			sx={{ height: '32px', width: '32px' }}
			strokeWidth={2}
		/>
	</IconButton>
);

export default ArrowRight;
