import { CircularProgress, Stack } from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
	useRef,
	useState,
	useLayoutEffect,
	useEffect,
	useCallback,
} from 'react';
import { MessageItem } from './MessageItem';

const ITEM_HEIGHT = 35 + 8;

const MessageList = ({
	messages,
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
	onMessageVisible,
	style,
	...props
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
	const isInitialScrollRef = useRef(true);
	const allowTopFetchRef = useRef(false);
	const pendingInitialScrollRef = useRef(false);
	const [containerHeight, setContainerHeight] = useState(0);

	useLayoutEffect(() => {
		const element = parentRef.current;
		if (!element) {
			return undefined;
		}

		const updateHeight = () => {
			setContainerHeight(element.clientHeight);
		};

		updateHeight();

		if (typeof ResizeObserver === 'undefined') {
			if (typeof window === 'undefined') {
				return undefined;
			}

			window.addEventListener('resize', updateHeight);
			return () => {
				window.removeEventListener('resize', updateHeight);
			};
		}

		const observer = new ResizeObserver(updateHeight);
		observer.observe(element);

		return () => observer.disconnect();
	}, []);

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
	const pad = Math.max(0, containerHeight - totalSize);

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
					if (!allowTopFetchRef.current) {
						return;
					}

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

	useLayoutEffect(() => {
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
		const currentTotalSize = virtualizer.getTotalSize();

		if (prevCount == null) {
			scrollRef.current = {
				index: messages.length - (hasNextPage ? 0 : 1),
				align: 'end',
			};
			isInitialScrollRef.current = true;
			allowTopFetchRef.current = false;
			pendingInitialScrollRef.current = true;
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
						delta: currentTotalSize - prevTotalSizeRef.current,
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
		prevTotalSizeRef.current = currentTotalSize;
	}, [messages, hasNextPage, virtualizer]);

	const handleScroll = useCallback(() => {
		const element = parentRef.current;
		if (!element) return;

		const threshold = 16;
		const { scrollTop, scrollHeight, clientHeight } = element;
		prevScrollRef.current = scrollTop;

		isAtBottomRef.current =
			scrollHeight - scrollTop - clientHeight <= threshold;
	}, []);

	useLayoutEffect(() => {
		/* scroll based on scrollRef */
		if (!scrollRef.current) {
			return;
		}

		const { index, align, adjust, behavior } = scrollRef.current;

		if (adjust) {
			if (!parentRef.current) {
				return;
			}
			virtualizer.scrollToOffset(adjust.base + adjust.delta);
			scrollRef.current = null;
			if (pendingInitialScrollRef.current) {
				allowTopFetchRef.current = true;
				pendingInitialScrollRef.current = false;
			}
			return;
		}

		const shouldFollowUp = isInitialScrollRef.current;
		scrollRef.current = null;
		isInitialScrollRef.current = false;

		if (shouldFollowUp) {
			requestAnimationFrame(() => {
				virtualizer.scrollToIndex(index, { align, behavior });
				if (pendingInitialScrollRef.current) {
					allowTopFetchRef.current = true;
					pendingInitialScrollRef.current = false;
				}
			});
		} else if (pendingInitialScrollRef.current) {
			virtualizer.scrollToIndex(index, { align, behavior });
			allowTopFetchRef.current = true;
			pendingInitialScrollRef.current = false;
		}
	}, [messages.length, virtualizer]);

	return (
		<div
			ref={parentRef}
			onScroll={handleScroll}
			style={{
				height: '100%',
				overflow: 'auto',
				contain: 'strict',
				...style,
			}}
			{...props}
		>
			{pad > 0 && <div style={{ height: pad }} />}

			<div
				style={{
					height: totalSize,
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
