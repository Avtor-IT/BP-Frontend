import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Slider from 'react-slick';
import CheckCircle from 'shared/icons/CheckCircle';
import cls from '../notifications.module.scss';
import './SliderNotifications.scss';

const SliderNotifications = ({
	navDots,
	refFunction,
	notifications,
	currentSlide,
}) => {
	const settings = {
		dots: false,
		arrows: false,
		swipeToSlide: true,
		waitForAnimate: false,
		cancelable: true,
	};

	return (
		<Box className={`${cls.sliderNotifications} slider-container`}>
			<Slider
				{...settings}
				asNavFor={navDots}
				ref={refFunction}
				className="slider-notifications"
			>
				{notifications.map((notification, index) => (
					<Box
						key={index}
						className={`${cls.slideNotification} ${
							currentSlide === index ? cls.fadeIn : cls.fadeOut
						}`}
					>
						<Typography variant="R16">{notification}</Typography>
						<Box
							style={{
								position: 'absolute',
								right: '-2px',
								top: '-47px',
							}}
						>
							<IconButton sx={{ p: 0 }}>
								<CheckCircle />
							</IconButton>
						</Box>
					</Box>
				))}
			</Slider>
		</Box>
	);
};

export default SliderNotifications;
