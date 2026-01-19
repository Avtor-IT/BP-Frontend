import { CircularProgress, Stack } from '@mui/material';
import { useEffect, useLayoutEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import { useVirtualizer } from '@tanstack/react-virtual';

const ITEM_HEIGHT = 45 + 8;

const MessageList = ({
	messages,
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
	onMessageVisible,
	listHeight,
	status: _status,
}) => {
	const parentRef = useRef(null);
	const topRef = useRef(null);
	const countRef = useRef(null);
	const scrollRef = useRef(null);
	const isAtBottomRef = useRef(true);
	const prevFirstIdRef = useRef(null);
	const prevLastIdRef = useRef(null);
	const prevScrollRef = useRef(0);
	const prevTotalSizeRef = useRef(0);

	const virtualizer = useVirtualizer({
		count: hasNextPage ? messages.length + 1 : messages.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => ITEM_HEIGHT,
		overscan: 4,
		useAnimationFrameWithResizeObserver: true,
		getItemKey: (index) => {
			if (hasNextPage && index === 0) return 'loader';
			const messageIndex = hasNextPage ? index - 1 : index;
			return messages[messageIndex]?.id ?? `row-${index}`;
		},
		shouldAdjustScrollPositionOnItemSizeChange: (item, delta, instance) => {
			const first = instance.getVirtualItems()[0];
			return first ? item.index < first.index : false;
		},
	});

	const items = virtualizer.getVirtualItems();
	const totalSize = virtualizer.getTotalSize();
	const pad = Math.max(0, parseInt(listHeight) - totalSize);

	useEffect(() => {
		/* observe top for paging */
		const root = parentRef.current;
		if (!root) {
			return undefined;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.target.id !== 'top') return;
					if (
						entry.isIntersecting &&
						hasNextPage &&
						!isFetchingNextPage
					) {
						fetchNextPage();
					}
				});
			},
			{ root }
		);

		if (topRef.current) {
			observer.observe(topRef.current);
		}

		return () => observer.disconnect();
	}, [hasNextPage, fetchNextPage, isFetchingNextPage]);

	useEffect(() => {
		/* update scrollRef if the messages count changes */
		if (!messages.length) {
			countRef.current = 0;
			prevFirstIdRef.current = null;
			prevLastIdRef.current = null;
			return;
		}

		const prevCount = countRef.current;
		const firstId = messages[0]?.id;
		const lastId = messages[messages.length - 1]?.id;
		const lastMessage = messages[messages.length - 1];
		const totalSize = virtualizer.getTotalSize();

		if (prevCount == null) {
			scrollRef.current = {
				index: messages.length - (hasNextPage ? 0 : 1),
				align: 'end',
			};
		} else if (prevCount < messages.length) {
			const added = messages.length - prevCount;
			const isPrepend =
				prevFirstIdRef.current &&
				firstId &&
				prevFirstIdRef.current !== firstId;
			const isAppend =
				prevLastIdRef.current &&
				lastId &&
				prevLastIdRef.current !== lastId;
			const isOwnAppend = isAppend && lastMessage?.sender_type === 'user';

			if (isPrepend) {
				scrollRef.current = {
					index: added + (hasNextPage ? 1 : 0),
					align: 'top',
					adjust: {
						delta: totalSize - prevTotalSizeRef.current,
						base:
							parentRef.current.scrollTop ??
							prevScrollRef.current,
					},
				};
			} else if (isAppend && (isAtBottomRef.current || isOwnAppend)) {
				scrollRef.current = {
					index: messages.length - (hasNextPage ? 0 : 1),
					behavior: isOwnAppend ? 'smooth' : 'auto',
					align: 'end',
				};
			} else {
				scrollRef.current = null;
			}
		}

		countRef.current = messages.length;
		prevFirstIdRef.current = firstId;
		prevLastIdRef.current = lastId;
		prevTotalSizeRef.current = totalSize;
	}, [messages, hasNextPage]);

	const handleScroll = () => {
		const element = parentRef.current;
		if (!element) return;

		const threshold = 16;
		const { scrollTop, scrollHeight, clientHeight } = element;
		prevScrollRef.current = scrollTop;

		isAtBottomRef.current =
			scrollHeight - scrollTop - clientHeight <= threshold;
	};

	useLayoutEffect(() => {
		/* scroll based on scrollRef */
		if (scrollRef.current) {
			requestAnimationFrame(() => {
				if (!scrollRef.current) return;
				const { index, align, adjust, behavior } = scrollRef.current;

				if (adjust && parentRef.current) {
					virtualizer.scrollToOffset(adjust.base + adjust.delta);
					delete scrollRef.current.adjust;
				} else {
					/* Срабатывает при append, надо исправить */
					virtualizer.scrollToIndex(index, { align, behavior });
				}
			});
		}
	}, [messages.length, virtualizer]);

	return (
		<div
			ref={parentRef}
			onScroll={handleScroll}
			style={{
				height: listHeight,
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
				</div>
			</div>
		</div>
	);
};

export default MessageList;
