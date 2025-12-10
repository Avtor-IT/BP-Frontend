import { Badge, Container, IconButton } from '@mui/material';
import { Grid, Stack } from '@mui/system';
import { ChatBot } from 'entities/ChatBot';
import { User } from 'entities/User';
import { FallbackContent } from 'pages/FallbackPage';
import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MenuIcon } from 'shared/icons/Menu';
import { useMaxWidth } from 'shared/model';
import { AppRoutes, RoutePath } from 'shared/router';
import { Logo, LogoIcon } from 'shared/ui/Logo';
import { Navigation } from 'widgets/Navigation';
import NotificationsIcon from 'shared/icons/Notifications';

export const Layout = () => {
	const breakpoints = useMaxWidth();

	return (
		<Container
			fixed
			maxWidth="xxxl"
			sx={{ '@media (min-width: 1366px)': { paddingInline: 4 } }}
		>
			<Stack
				minHeight="100vh"
				paddingTop={4}
				gap={{ xxxl: 8, xxl: 4, xs: 3 }}
			>
				{/* Header */}
				<Grid
					container
					columns={{ xxl: 7, sx: 5 }}
					columnSpacing={2}
				>
					<Grid size={{ xxxl: 1, lg: 'auto', xs: 'grow' }}>
						<Link to={RoutePath[AppRoutes.MAIN]}>
							<Stack
								direction="row"
								alignItems="center"
								gap={2}
								sx={(theme) => ({
									[theme.breakpoints.up('xxxl')]: {
										paddingInline: 2,
									},
								})}
							>
								{breakpoints.md ? (
									<LogoIcon sx={{ width: 40, height: 40 }} />
								) : (
									<Logo
										sx={(theme) => ({
											[theme.breakpoints.down('xl')]: {
												width: 143,
												height: 40,
											},
											width: 201,
											height: 56,
										})}
									/>
								)}
							</Stack>
						</Link>
					</Grid>
					<Grid
						size={'grow'}
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: breakpoints.lg ? 'center' : 'start',
						}}
					>
						<ChatBot />
					</Grid>

					<Grid
						size={'auto'}
						sx={{
							display: 'flex',
							gap: 1,
							justifyContent: 'end',
							alignItems: 'center',
						}}
					>
						<IconButton>
							<Badge
								badgeContent={100}
								color="error"
							>
								<NotificationsIcon />
							</Badge>
						</IconButton>

						{breakpoints.lg ? (
							<IconButton>
								<MenuIcon />
							</IconButton>
						) : (
							<User />
						)}
					</Grid>
				</Grid>

				{/* Nav & Page content */}

				{breakpoints.xxl && !breakpoints.lg && <Navigation />}

				<Grid
					container
					flexGrow={1}
					columns={{ xxl: 7, xs: 5 }}
					columnSpacing={2}
					rowSpacing={{ xxl: 8, xs: 4 }}
				>
					{!breakpoints.xxl && (
						<Grid size={1}>
							<Navigation />
						</Grid>
					)}
					<Grid
						size={6}
						minHeight={!breakpoints.xxl ? '100%' : undefined}
					>
						<Suspense fallback={<FallbackContent />}>
							<Outlet />
						</Suspense>
					</Grid>
				</Grid>
			</Stack>
		</Container>
	);
};
