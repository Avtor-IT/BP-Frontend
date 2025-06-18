import { useTheme } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { areMapsEqual } from 'shared/lib';

const useMaxWidth = () => {
	const theme = useTheme();
	const breakpoints = { ...theme.breakpoints.values };

	const breakpointsMap = new Map();
	const breakpointsMapRef = useRef(
		new Map(
			Object.entries(breakpoints).map(([key, value]) => [
				key,
				window.innerWidth < value,
			])
		)
	);

	const [sizes, setSizes] = useState(
		Object.fromEntries(breakpointsMapRef.current)
	);

	useEffect(() => {
		Object.entries(breakpoints).forEach(([key, value]) => {
			breakpointsMap.set(key, window.innerWidth < value);
		});

		const resizeHandler = () => {
			Object.entries(breakpoints).forEach(([key, value]) => {
				breakpointsMap.set(key, window.innerWidth < value);
			});

			if (!areMapsEqual(breakpointsMap, breakpointsMapRef.current)) {
				breakpointsMapRef.current = new Map(breakpointsMap);
				setSizes(Object.fromEntries(breakpointsMapRef.current));
			}
		};

		window.addEventListener('resize', resizeHandler);
		return () => window.removeEventListener('resize', resizeHandler);
	}, []);

	return sizes;
};

export default useMaxWidth;
