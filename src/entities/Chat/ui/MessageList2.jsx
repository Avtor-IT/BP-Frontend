import { CircularProgress, Stack } from '@mui/material';
import { useEffect, useLayoutEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import { useVirtualizer } from '@tanstack/react-virtual';

const LIST_HEIGHT = 700;
const ITEM_HEIGHT = 45 + 8;

const MessageList = ({
	messages,
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
	onMessageVisible,
	status: _status,
}) => {
	const parentRef = useRef(null);
	const bottomRef = useRef(null);
	const topRef = useRef(null);
	const countRef = useRef(null);
	const scrollRef = useRef(null);

	const virtualizer = useVirtualizer({
		count: hasNextPage ? messages.length + 1 : messages.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => ITEM_HEIGHT,
		overscan: 4,
	});

	const items = virtualizer.getVirtualItems();
	const totalSize = virtualizer.getTotalSize();
	const pad = Math.max(0, LIST_HEIGHT - totalSize);

	useEffect(() => {
		/* observe top & bottom */
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.target.id === 'top') {
					if (
						entry.isIntersecting &&
						hasNextPage &&
						!isFetchingNextPage
					) {
						fetchNextPage();
					}
				}
			});
		});

		if (topRef.current) observer.observe(topRef.current);
		if (bottomRef.current) observer.observe(bottomRef.current);

		return () => observer.disconnect();
	}, [hasNextPage, fetchNextPage, isFetchingNextPage]);

	useEffect(() => {
		/* update scrollRef if the messages count changes */
		if (messages.length === countRef.current) return; // to avoid duplicate calls

		/* scroll to an end on the initial messages fetch */
		if (!scrollRef.current) {
			scrollRef.current = {
				index: messages.length - (hasNextPage ? 0 : 1),
				align: 'end',
			};
			countRef.current = messages.length;
			return;
		}

		scrollRef.current = {
			index: messages.length - countRef.current + (hasNextPage ? 1 : 0),
			align: 'top',
		};

		countRef.current = messages.length;
	}, [messages.length, virtualizer]);

	useLayoutEffect(() => {
		/* scroll based on scrollRef */
		if (scrollRef.current) {
			requestAnimationFrame(() => {
				const { index, align } = scrollRef.current;
				console.log(index, align);
				virtualizer.scrollToIndex(index, { align });
			});
		}
	}, [messages.length, virtualizer]);

	return (
		<div
			ref={parentRef}
			style={{
				height: LIST_HEIGHT + 'px',
				overflow: 'auto',
				contain: 'strict',
			}}
		>
			{pad > 0 && <div style={{ height: pad }} />}

			<div
				style={{
					height: virtualizer.getTotalSize(),
					width: '100%',
					position: 'relative',
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						transform: `translateY(${items[0]?.start ?? 0}px)`,
					}}
				>
					<div
						id="top"
						ref={topRef}
					/>

					{items.map((virtualItem) => {
						const isLoaderRow =
							hasNextPage && virtualItem.index === 0;

						const messageIndex = hasNextPage
							? virtualItem.index - 1
							: virtualItem.index;

						const message = messages[messageIndex];

						return (
							<div
								key={virtualItem.key}
								data-index={virtualItem.index}
								ref={virtualizer.measureElement}
							>
								{isLoaderRow ? (
									<Stack
										alignItems="center"
										justifyContent="center"
										paddingBlock={2}
									>
										<CircularProgress color="secondary" />
									</Stack>
								) : (
									<MessageItem
										message={message}
										slotProps={{
											listItemText: {
												m: 0,
											},
											wrapper: {
												pb: 1,
											},
										}}
										onMessageVisible={onMessageVisible}
									/>
								)}
							</div>
						);
					})}

					<div
						style={{ position: 'absolute', bottom: 0 }}
						id="bottom"
						ref={bottomRef}
					/>
				</div>
			</div>
		</div>
	);
};

export default MessageList;
