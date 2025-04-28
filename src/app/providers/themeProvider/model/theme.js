import { createTheme } from '@mui/material';
import { palette, typography } from 'shared/mui';
import components from './components';

export const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1920,
		},
	},
	typography,
	components,
	palette,
});
