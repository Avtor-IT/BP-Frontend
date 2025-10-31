import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Slider from 'react-slick';
import CheckCircle from 'shared/icons/CheckCircle';
import cls from '../notifications.module.scss';
import { forwardRef } from 'react';
import { useMarkDone } from 'entities/Chat';

const SliderNotifications = forwardRef(function SliderNotifiations(
	{ navDots, notifications, currentSlide, beforeChange },
	ref
) {
	const settings = {
		dots: false,
		arrows: false,
		swipeToSlide: true,
		waitForAnimate: false,
		cancelable: true,
		beforeChange,
	};

	const markDone = useMarkDone();
	const handleMarkDone = (messageId, done) => {
		markDone.mutate({ messageId, done: !done });
	};

	return (
		<Box
			className={`${cls.sliderNotifications} slider-container`}
			sx={{
				'& .slick-list': { overflow: 'visible', height: '100%' },
				'& .slick-slider': { height: '100%' },
				'& .slick-track': { height: '100%' },
				flexGrow: 1,
			}}
		>
			<Slider
				{...settings}
				asNavFor={navDots}
				ref={ref}
				className="slider-notifications"
			>
				{notifications.map((notification, index) => {
					const className =
						currentSlide === index ? cls.fadeIn : cls.fadeOut;

					return (
						<Box
							key={notification.id}
							className={`${cls.slideNotification} ${className}`}
						>
							<Typography variant="R16">
								{notification.content}
							</Typography>
							<Box
								style={{
									position: 'absolute',
									right: '-2px',
									top: '-47px',
								}}
							>
								<IconButton
									sx={{
										p: 0,
										color: notification.done
											? 'primary.main'
											: undefined,
									}}
									loading={markDone.isPending}
									onClick={() =>
										handleMarkDone(
											notification.id,
											notification.done
										)
									}
								>
									<CheckCircle />
								</IconButton>
							</Box>
						</Box>
					);
				})}
			</Slider>
		</Box>
	);
});

export default SliderNotifications;
