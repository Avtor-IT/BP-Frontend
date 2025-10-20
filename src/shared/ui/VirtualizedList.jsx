import { Box } from '@mui/material';
import { forwardRef, useMemo, useRef, useState } from 'react';

export const VirtualizedList = forwardRef(function VirtualizedList(
	{
		list,
		endRef,
		firstItem,
		slotProps,
		itemHeight,
		listHeight,
		renderItem,
		overscan = 4,
		...props
	},
	ref
) {
	const count = useMemo(() => {
		return list.length;
	}, [list]);

	const calculatedListHeight = useMemo(() => {
		return listHeight || count * itemHeight;
	}, [listHeight]);

	const startRef = useRef(0);
	const [start, setStart] = useState(0);
	const [end, setEnd] = useState(
		start + Math.ceil(calculatedListHeight / itemHeight)
	);

	const handleScroll = (e) => {
		const startRaw = Math.ceil(e.currentTarget.scrollTop / itemHeight);

		if (startRef.current !== startRaw) {
			startRef.current = startRaw;
			setStart(startRaw);
			setEnd(startRaw + Math.ceil(calculatedListHeight / itemHeight));
		}

		slotProps?.innerBox?.onScroll?.(e);
	};

	return (
		<Box
			{...props}
			position="relative"
			flexGrow={1}
			ref={ref}
		>
			<Box
				position="absolute"
				top={0}
				bottom={0}
				left={0}
				right={0}
				overflow="auto"
				pr={1}
				{...slotProps?.innerBox}
				onScroll={handleScroll}
			>
				{firstItem}

				<Box
					position="relative"
					height={`${count * itemHeight}px`}
				>
					{list.map((item, index) => {
						if (
							index + overscan < start ||
							index - overscan > end
						) {
							return null;
						}

						return (
							<div
								key={
									item.id ||
									`${index}-${Math.round(
										Math.random() * 1000
									)}`
								}
								style={{
									position: 'absolute',
									left: 0,
									right: 0,
									top: 0,
									transform: `translateY(${
										itemHeight * index
									}px)`, // better than top coordinate by perfomance issues
								}}
							>
								{renderItem(item, index)}
							</div>
						);
					})}
				</Box>

				{endRef && <div ref={endRef} />}
			</Box>
		</Box>
	);
});
