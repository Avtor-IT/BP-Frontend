import { IconButton } from '@mui/material';
import { ArrowInCircle } from 'shared/icons/ArrowInCircle';

const ArrowLeft = ({ slideCount: _, currentSlide, ...props }) => {
	return (
		<IconButton
			{...props}
			aria-hidden="true"
			disabled={currentSlide === 0}
			sx={{
				p: 0,
				'&:before': { display: 'none' },
				transform: 'scaleX(-1)',
				position: 'absolute',
				left: 'auto',
				right: '-76px',
				top: '50px',
				width: '32px',
				height: '32px',
				zIndex: 2,
				color: 'secondary.main',
				'&:focus, &:hover': {
					color: 'secondary.main',
				},
				...props.sx,
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

export default ArrowLeft;
