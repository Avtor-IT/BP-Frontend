import { CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import { useCallback, useRef } from 'react';
import { ScrollBox } from 'shared/ui/Scrollable';

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

	return (
		<ScrollBox
			{...props}
			slotProps={{
				innerBox: {
					ref: setScrollRef,
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
				<div ref={setEndRef} />
			</List>
		</ScrollBox>
	);
};

export default MessagesList;
