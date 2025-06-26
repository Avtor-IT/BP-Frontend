import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { Card } from 'shared/ui/Card';
import cls from './notifications.module.scss';
import SliderDots from './slider/SliderDots';
import SliderNotifications from './slider/SliderNotifications';

export const Notifications = (props) => {
	const [currentSlide, setCurrentSlide] = useState(0); // Состояние для хранения текущего слайда

	const [navSlider, setNavSlider] = useState(null);
	const [navDots, setNavDots] = useState(null);
	let refSlider = useRef(null);
	let refDots = useRef(null);

	useEffect(() => {
		setNavSlider(refSlider);
		setNavDots(refDots);
	}, []);

	const notifications = [
		'1. Необходимо предоставить документы вновь принятого сотрудника до 16:00 текущего дня. В противном случае датой приема будет следующий день.',
		'2. Тестовое уведомление тестовое тестовое тестовое тестовое уведомление. ',
		'3. Тестовое уведомление тестовое тестовое тестовое уведомление. ',
		'4. Тестовое уведомление тестовое тестовое уведомление. ',
		'5. Тестовое уведомление все еще тест. ',
		'6. Тестовое уведомление и здесь тест. ',
		'7. Тестовое уведомление здесь тоже тест. ',
	];

	return (
		<Card
			{...props}
			className={cls.notificationsCard}
		>
			<Box
				width="100%"
				position="relative"
			>
				<Box>
					{notifications?.length > 0 ? (
						<>
							<Typography
								variant="M24"
								color="primary"
							>
								Внимание!
							</Typography>

							<SliderNotifications
								navDots={navDots}
								currentSlide={currentSlide}
								notifications={notifications}
								refFunction={(slider) => (refSlider = slider)}
							/>

							<SliderDots
								navSlider={navSlider}
								refFunction={(slider) => (refDots = slider)}
								notifications={notifications}
								beforeChange={(_, next) =>
									setCurrentSlide(next)
								}
								currentSlide={currentSlide}
							/>
						</>
					) : (
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: '16px',
							}}
						>
							<Typography
								variant="M24"
								sx={{ color: 'tertiary.main' }}
							>
								Ничего срочного!
							</Typography>
							<Typography
								variant="R16"
								sx={{ color: 'tertiary.main' }}
							>
								Если у вас возникли трудности, обратитесь к
								менеджеру.
							</Typography>
						</Box>
					)}
				</Box>
			</Box>
		</Card>
	);
};
