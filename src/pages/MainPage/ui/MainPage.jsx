import { Stack, Typography } from '@mui/material';
import { Grid } from '@mui/system';
import {
	ServiceAnchorList,
	ServiceWidgetList,
} from 'entities/Service/index.js';
import { useMinWidth } from 'shared/model/index.js';
import SectionTitle from 'shared/ui/SectionTitle';
import { CompanyCard } from 'widgets/CompanyCard';
import { MyManager } from 'widgets/ManagerCard';
import { Notifications } from 'widgets/Notifications';
import { Recommends } from 'entities/Recommends';

const MainPage = () => {
	const breakpoints = useMinWidth();

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

				{!breakpoints.lg && (
					<Grid
						size={2}
						order={{ xxxl: 3, lg: 2, xs: 5 }}
						sx={{ minHeight: '192px' }}
					>
						<MyManager sx={{ height: '100%' }} />
					</Grid>
				)}

				<Grid
					size={{
						xxxl: 1,
						xxl: 5,
					}}
					order={{ xxl: 2, xs: 3 }}
					sx={(theme) => ({
						[theme.breakpoints.up('xxxl')]: {
							minHeight: '192px',
						},
					})}
				>
					<Notifications sx={{ height: '100%' }} />
				</Grid>

				<Grid
					size={5}
					order={4}
				>
					<Recommends sx={{ minHeight: '337px' }} />
				</Grid>
			</Grid>

			{!breakpoints.xxl && <SectionTitle>Мои услуги</SectionTitle>}

			{breakpoints.lg && (
				<Typography variant="M20">Быстрый переход</Typography>
			)}

			<ServiceAnchorList />
			<ServiceWidgetList />
		</Stack>
	);
};

export default MainPage;
