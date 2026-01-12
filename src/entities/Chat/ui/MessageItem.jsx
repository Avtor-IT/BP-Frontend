import { useEffect, useRef } from 'react';
import { ListItemText, Stack } from '@mui/material';
import { formatTimestampToShortDate } from 'shared/lib';

// Компонент для отдельного сообщения с Intersection Observer
const MessageItem = ({ message, onMessageVisible, slotProps, ...props }) => {
	const messageRef = useRef(null);

	useEffect(() => {
		const element = messageRef.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						onMessageVisible?.(message);
					}
				});
			},
			{
				rootMargin: '0px', // Сообщение считается видимым за 0px до появления на экране
				threshold: 0.5, // Сообщение должно быть видно на 50%
			}
		);

		observer.observe(element);

		return () => {
			observer.unobserve(element);
		};
	}, [message.id, message, onMessageVisible]);

	return (
		<div
			ref={messageRef}
			{...props}
		>
			<Stack
				alignItems={message.sender_type === 'user' ? 'end' : 'start'}
				pr={1}
				{...slotProps?.wrapper}
			>
				<ListItemText
					primary={message.content}
					secondary={`${formatTimestampToShortDate(
						message.timestamp
					)}\n${message.read ? '✓' : '○'}`}
					{...slotProps?.listItemText}
					slotProps={{
						primary: {
							typography: 'R20',
							color:
								message.sender_type === 'user'
									? 'primary.contrastText'
									: 'textPrimary.default',
						},
						secondary: {
							typography: 'R16',
							color:
								message.sender_type === 'user'
									? 'textSecondary.secondary'
									: 'textSecondary.light',
							textAlign: 'end',
						},
					}}
					sx={{
						minWidth: '250px',
						maxWidth: '626px',
						backgroundColor:
							message.sender_type === 'user'
								? 'secondary.main'
								: 'background.bubble',
						pl: message.sender_type === 'user' ? 20 : undefined,
						borderRadius: 4,
						borderTopLeftRadius:
							message.sender_type === 'user' ? undefined : 0,
						borderBottomRightRadius:
							message.sender_type === 'user' ? 0 : undefined,
						paddingBlock: 1,
						paddingInline: 2,
						...slotProps?.listItemText,
						pr:
							message.sender_type === 'user'
								? undefined
								: 20 + slotProps?.listItemText?.pr,
					}}
				/>
			</Stack>
		</div>
	);
};

export default MessageItem;
