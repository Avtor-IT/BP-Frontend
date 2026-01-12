import { CircularProgress, ListItem } from '@mui/material';
import { useCallback, useMemo, useRef } from 'react';
import { VirtualizedList } from 'shared/ui/VirtualizedList';
import MessageItem from './MessageItem';

const LOAD_OFFSET = 60;

const MessagesList = ({
	messages,
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
	onMessageVisible,
	...props
}) => {
	const messagesList = useMemo(() => {
		return messages.pages.flatMap((page) => page.results).reverse();
	}, [messages]);

	const scrollRef = useRef(null);
	const initialScrolled = useRef(false);

	const setEndRef = useCallback((node) => {
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
	}, []);

	const handleScroll = useCallback(
		(e) => {
			if (!hasNextPage || isFetchingNextPage || !initialScrolled.current)
				return;
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

	return (
		<VirtualizedList
			list={messagesList}
			endRef={setEndRef}
			listHeight={700}
			itemHeight={44}
			slotProps={{
				innerBox: {
					ref: setScrollRef,
					onScroll: handleScroll,
				},
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
				<MessageItem
					message={message}
					onMessageVisible={onMessageVisible}
					key={message.id}
				/>
			)}
			{...props}
		/>
	);
};

export default MessagesList;
