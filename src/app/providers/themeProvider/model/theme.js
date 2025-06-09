import { createTheme } from '@mui/material';
import { palette, typography } from 'shared/mui';
import components from './components';

export const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 360,
			md: 480,
			lg: 768,
			xl: 960,
			xxl: 1366,
			xxxl: 1920,
		},
	},
	typography,
	components,
	palette,
});
