import { CardContent, Skeleton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRef, useState } from 'react';
import { Card } from 'shared/ui/Card';
import cls from './notifications.module.scss';
import SliderDots from './slider/SliderDots';
import SliderNotifications from './slider/SliderNotifications';
import { useImportantMessages } from 'entities/Chat';
import { useManagerChat } from 'entities/Chat';

export const Notifications = (props) => {
	const {
		data: managerChat,
		isError: isManagerChatError,
		isLoading: isManagerLoading,
	} = useManagerChat();

	const {
		data: importantMessages,
		isLoading,
		isError,
	} = useImportantMessages(managerChat?.id);

	const [currentSlide, setCurrentSlide] = useState(0);

	let refSlider = useRef(null);
	let refDots = useRef(null);

	if (isLoading || isManagerLoading) {
		return (
			<Skeleton
				variant="rounded"
				{...props}
			/>
		);
	}

	if (isError || isManagerChatError) {
		return (
			<Card
				{...props}
				className={cls.notificationsCard}
			>
				<CardContent
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '100%',
					}}
				>
					<Typography variant="M20">Ошибка</Typography>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card
			{...props}
			className={cls.notificationsCard}
		>
			{importantMessages?.length > 0 ? (
				<Stack
					width="100%"
					position="relative"
					height="100%"
					gap={2}
				>
					<Typography
						variant="M24"
						color="primary"
					>
						Внимание!
					</Typography>

					<SliderNotifications
						navDots={refDots.current}
						currentSlide={currentSlide}
						notifications={importantMessages}
						beforeChange={(_, next) => setCurrentSlide(next)}
						ref={refSlider}
					/>

					{importantMessages?.length > 2 && (
						<SliderDots
							navSlider={refSlider.current}
							ref={refDots}
							notifications={importantMessages}
							currentSlide={currentSlide}
						/>
					)}
				</Stack>
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
						Если у вас возникли трудности, обратитесь к менеджеру.
					</Typography>
				</Box>
			)}
		</Card>
	);
};
