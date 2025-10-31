import { Stack, Typography } from '@mui/material';
import { Grid, minHeight } from '@mui/system';
import { CompanyBalanceCard, CompanyCard } from 'entities/Company';
import { ManagerCard } from 'entities/Manager';
import { Notifications } from 'entities/Notifications';
import { ServiceAnchorList, ServiceListWidget } from 'entities/Service';
import { useMaxWidth } from 'shared/model';
import SectionTitle from 'shared/ui/SectionTitle';

const MainPage = () => {
	const breakpoints = useMaxWidth();

	return (
		<Stack gap={3}>
			<Grid
				container
				columns={5}
				spacing={2}
			>
				<Grid
					size={{
						xxxl: 2,
						lg: 3,
						xs: 5,
					}}
					order={1}
					sx={{ minHeight: '192px' }}
				>
					<CompanyCard sx={{ height: '100%' }} />
				</Grid>

				{breakpoints.lg && (
					<Grid
						size={5}
						order={2}
						sx={{ minHeight: 104 }}
					>
						<CompanyBalanceCard sx={{ height: '100%' }} />
					</Grid>
				)}

				{!breakpoints.lg && (
					<Grid
						size={2}
						order={{ xxxl: 3, lg: 2, xs: 5 }}
						sx={{ minHeight: '192px' }}
					>
						<ManagerCard
							showPic={!breakpoints.xxxl}
							sx={{ height: '100%' }}
						/>
					</Grid>
				)}

				<Grid
					size={{
						xxxl: 1,
						xs: 5,
					}}
					order={{ xxl: 2, xs: 3 }}
					sx={(theme) => ({
						[theme.breakpoints.up('xxxl')]: {
							minHeight: '192px',
						},
					})}
				>
					<Notifications sx={{ height: '100%', minHeight: 146 }} />
				</Grid>

				{/* <Grid
					size={5}
					order={4}
				>
					<LegislationChanges sx={{ minHeight: '337px' }} />
				</Grid> */}
			</Grid>

			{!breakpoints.xxxl && <SectionTitle>Мои услуги</SectionTitle>}

			{breakpoints.lg && (
				<Typography variant="M20">Быстрый переход</Typography>
			)}

			{breakpoints.xxl && <ServiceAnchorList />}
			<ServiceListWidget />
		</Stack>
	);
};

export default MainPage;
