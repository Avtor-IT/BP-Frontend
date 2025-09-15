import { CircularProgress, ListItem, ListItemText } from '@mui/material';
import { useCallback, useMemo, useRef } from 'react';
import { VirtualizedList } from './VirtualizedList';

const LOAD_OFFSET = 60;

const MessagesList = ({
	messages,
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
	...props
}) => {
	const scrollRef = useRef(null);
	const initialScrolled = useRef(false);

	const setEndRef = useCallback(
		(node) => {
			if (node) {
				node.scrollIntoView({
					behavior: initialScrolled.current ? 'smooth' : undefined,
				});
				if (scrollRef.current) {
					initialScrolled.current = true;
				} else {
					initialScrolled.current = false;
				}
			}
		},
		[messages]
	);

	const handleScroll = useCallback(
		(e) => {
			if (!hasNextPage || isFetchingNextPage) return;
			if (e.currentTarget.scrollTop <= LOAD_OFFSET) {
				const prevHeight = scrollRef.current?.scrollHeight ?? 0;
				fetchNextPage().then(() => {
					requestAnimationFrame(() => {
						if (scrollRef.current) {
							scrollRef.current.scrollTop =
								scrollRef.current.scrollHeight - prevHeight;
						}
					});
				});
			}
		},
		[hasNextPage, isFetchingNextPage, fetchNextPage]
	);

	const setScrollRef = useCallback(
		(node) => {
			if (node) {
				scrollRef.current = node;
				const needsMoreContent =
					node.scrollHeight <= node.clientHeight &&
					hasNextPage &&
					!isFetchingNextPage;
				if (needsMoreContent) {
					fetchNextPage();
				}
			}
		},
		[hasNextPage, isFetchingNextPage, fetchNextPage]
	);

	const messagesList = useMemo(() => {
		return messages.pages.flatMap((page) => page.results).reverse();
	}, [messages]);

	return (
		<VirtualizedList
			list={messagesList}
			endRef={setEndRef}
			listHeight={700}
			itemHeight={44}
			slotProps={{
				innerBox: { ref: setScrollRef, onScroll: handleScroll },
			}}
			firstItem={
				hasNextPage ? (
					<ListItem
						sx={{ display: 'flex', justifyContent: 'center' }}
					>
						<CircularProgress />
					</ListItem>
				) : null
			}
			renderItem={(message) => (
				<ListItemText
					primary={message.content}
					secondary={new Date(message.timestamp).toLocaleString()}
					sx={{
						textAlign:
							message.sender_type === 'user' ? 'right' : 'left',
					}}
				/>
			)}
			{...props}
		/>
	);
};
export default MessagesList;
