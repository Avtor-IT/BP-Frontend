import {
	Box,
	CircularProgress,
	List,
	ListItem,
	ListItemText,
	Stack,
} from '@mui/material';
import { useMessages } from 'entities/Chat';
import { useEffect, useRef } from 'react';
import { ScrollBox } from 'shared/ui/Scrollable';

const ChatHistory = ({ id, ...props }) => {
	const {
		data: messages,
		isLoading: isMessagesLoading,
		isError: isMessagesError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useMessages(id);

	const messagesEndRef = useRef(null);
	const scrollRef = useRef(null);
	const initialScrolled = useRef(false);
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({
			behavior: initialScrolled.current ? 'smooth' : undefined,
		});
	};

	useEffect(() => {
		if (messages && messagesEndRef.current) {
			scrollToBottom();
			initialScrolled.current = true;
		}
	}, [messages]);

	useEffect(() => {
		if (!messages || !scrollRef.current) return;

		const el = scrollRef.current;
		const needsMoreContent =
			el.scrollHeight <= el.clientHeight &&
			hasNextPage &&
			!isFetchingNextPage;

		if (needsMoreContent) {
			fetchNextPage();
		}
	}, [messages, hasNextPage, isFetchingNextPage]);

	const handleScroll = (e) => {
		if (!hasNextPage || isFetchingNextPage) return;
		if (e.target.scrollTop === 0) {
			const prevHeight = scrollRef.current.scrollHeight;

			fetchNextPage().then(() => {
				requestAnimationFrame(() => {
					if (scrollRef.current) {
						scrollRef.current.scrollTop =
							scrollRef.current.scrollHeight - prevHeight;
					}
				});
			});
		}
	};

	if (isMessagesLoading) {
		return (
			<Stack
				flexGrow={1}
				justifyContent="center"
				alignItems="center"
			>
				<CircularProgress />
			</Stack>
		);
	}

	if (isMessagesError) {
		return (
			<Stack
				flexGrow={1}
				justifyContent="center"
				alignItems="center"
			>
				<Box>Ошибка при загрузке чата</Box>
			</Stack>
		);
	}

	return (
		<ScrollBox
			{...props}
			slotProps={{
				innerBox: {
					ref: scrollRef,
					onScroll: handleScroll,
				},
			}}
		>
			<List>
				{hasNextPage && (
					<ListItem
						sx={{ display: 'flex', justifyContent: 'center' }}
					>
						<CircularProgress />
					</ListItem>
				)}

				{messages.pages
					.flatMap((page) => page.results)
					.map((message) => (
						<ListItemText
							key={message.id}
							primary={message.content}
							secondary={new Date(
								message.timestamp
							).toLocaleString()}
							sx={{
								textAlign:
									message.sender_type === 'user'
										? 'right'
										: 'left',
							}}
						/>
					))
					.reverse()}
				<div ref={messagesEndRef} />
			</List>
		</ScrollBox>
	);
};

export default ChatHistory;
