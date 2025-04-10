import { Container } from '@mui/material';
import { Box, Grid, Stack } from '@mui/system';
import { FallbackContent } from 'pages/FallbackPage';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import LogoText, { LogoIcon } from 'shared/ui/Logo';
import { Header } from 'widgets/Header';
import { LogoLink } from 'widgets/LogoLink';
import { Navigation } from 'widgets/Navigation';
import { SideMenu } from 'widgets/SideMenu';

export const Layout = () => (
	<Container
		fixed
		maxWidth="xl"
		sx={{ paddingTop: 4, height: '100vh' }}
	>
		<Stack
			minHeight="100%"
			gap={8}
		>
			{/* Header */}
			<Grid
				container
				columns={7}
				columnSpacing={2}
			>
				<Grid size={1}>
					<Stack
						direction="row"
						justifyContent="center"
					>
						<LogoLink>
							<Stack
								direction="row"
								alignItems="center"
								justifyContent="center"
								spacing="16px"
							>
								<LogoIcon />
								<LogoText />
							</Stack>
						</LogoLink>
					</Stack>
				</Grid>
				<Grid size={6}>
					<Header />
				</Grid>
			</Grid>

			{/* Nav & Page content */}
			<Grid
				container
				flexGrow={1}
				columns={7}
				columnSpacing={2}
				rowSpacing={8}
			>
				<Grid size={1}>
					<Stack
						direction="row"
						justifyContent="center"
					>
						<Box
							paddingInline={2}
							width="100%"
						>
							<SideMenu>
								<Navigation />
							</SideMenu>
						</Box>
					</Stack>
				</Grid>
				<Grid
					size={6}
					minHeight="100%"
				>
					<Suspense fallback={<FallbackContent />}>
						<Outlet />
					</Suspense>
				</Grid>
			</Grid>
		</Stack>
	</Container>
);
