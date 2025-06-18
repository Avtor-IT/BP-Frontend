import { Container, IconButton } from '@mui/material';
import { Grid, Stack } from '@mui/system';
import { ChatBot } from 'entities/ChatBot';
import { NotificationButton } from 'entities/Notifications';
import { User } from 'entities/User';
import { FallbackContent } from 'pages/FallbackPage';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { MenuIcon } from 'shared/icons/Menu';
import { useMaxWidth } from 'shared/model';
import { Logo, LogoIcon } from 'shared/ui/Logo';
import { LogoLink } from 'widgets/LogoLink';
import { Navigation } from 'widgets/Navigation';

export const Layout = () => {
	const breakpoints = useMaxWidth();

	return (
		<Container
			fixed
			maxWidth="xxxl"
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
						<LogoLink>
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
						</LogoLink>
					</Grid>
					<Grid
						size={{ lg: 1, xs: 'grow' }}
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<ChatBot />
					</Grid>

					<Grid
						size={'grow'}
						sx={{
							display: 'flex',
							gap: 1,
							justifyContent: 'end',
							alignItems: 'center',
						}}
					>
						<NotificationButton />

						{breakpoints.lg ? (
							<IconButton>
								<MenuIcon />
							</IconButton>
						) : (
							<>
								<User />
							</>
						)}
					</Grid>
				</Grid>

				{/* Nav & Page content */}
				<Grid
					container
					flexGrow={1}
					columns={{ xxl: 7, xs: 5 }}
					columnSpacing={2}
					rowSpacing={{ xxl: 8, xs: 4 }}
				>
					{!breakpoints.lg && (
						<Grid size={{ xxl: 1, xs: 5 }}>
							<Navigation />
						</Grid>
					)}
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
};
