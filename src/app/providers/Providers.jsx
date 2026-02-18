import React from 'react';
import { ThemeProvider } from './themeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Routes from './router/ui/Routes';

const queryClient = new QueryClient();

export const Providers = () => {
	return (
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider>
					<Routes />
				</ThemeProvider>
			</QueryClientProvider>
		</React.StrictMode>
	);
};
