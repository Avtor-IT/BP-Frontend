import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export const VirtualizedLettersList = ({
	items,
	renderItem,
	key = 'id',
	itemHeight,
	overscan = 2,
}) => {
	const boxRef = useRef(null);
	const rafRef = useRef(null);
	const [startIndex, setStartIndex] = useState(0);
	const [endIndex, setEndIndex] = useState(0);

	const updateRange = useCallback(() => {
		if (!boxRef.current || !itemHeight || items.length === 0) {
			setStartIndex(0);
			setEndIndex(0);
			return;
		}

		const rect = boxRef.current.getBoundingClientRect();
		const containerTopAbs = rect.top + window.scrollY; // top relative to document

		const viewportTop = window.scrollY;
		const viewportBottom = viewportTop + window.innerHeight;

		// Determine visible window relative to container
		const visibleTop = Math.max(0, viewportTop - containerTopAbs);
		const visibleBottom = Math.min(
			rect.height,
			viewportBottom - containerTopAbs
		);

		// If container is completely outside viewport
		if (visibleBottom <= 0 || visibleTop >= rect.height) {
			// choose small window to avoid rendering everything
			setStartIndex(0);
			setEndIndex(-1);
			return;
		}

		const firstVisible = Math.floor(visibleTop / itemHeight);
		const lastVisible = Math.floor((visibleBottom - 1) / itemHeight);

		const newStart = Math.max(0, firstVisible - overscan);
		const newEnd = Math.min(items.length - 1, lastVisible + overscan);

		setStartIndex((prev) => (prev === newStart ? prev : newStart));
		setEndIndex((prev) => (prev === newEnd ? prev : newEnd));
	}, [itemHeight, items.length, overscan]);

	const onScrollOrResize = useCallback(() => {
		if (rafRef.current) cancelAnimationFrame(rafRef.current);
		rafRef.current = requestAnimationFrame(() => {
			updateRange();
		});
	}, [updateRange]);

	useLayoutEffect(() => {
		updateRange();

		window.addEventListener('scroll', onScrollOrResize, { passive: true });
		window.addEventListener('resize', onScrollOrResize);

		return () => {
			window.removeEventListener('scroll', onScrollOrResize);
			window.removeEventListener('resize', onScrollOrResize);
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, [onScrollOrResize, updateRange]);

	return (
		<div
			ref={boxRef}
			style={{
				height: `${itemHeight * items.length}px`,
				position: 'relative',
				width: '100%',
			}}
		>
			{items.map((item, i) => {
				if (i > endIndex || i < startIndex) return null;

				return (
					<div
						key={item[key] ?? i}
						style={{
							height: `${itemHeight}px`,
							width: '100%',
							position: 'absolute',
							top: `${itemHeight * i}px`,
							left: 0,
						}}
					>
						{renderItem(item, i)}
					</div>
				);
			})}
		</div>
	);
};
