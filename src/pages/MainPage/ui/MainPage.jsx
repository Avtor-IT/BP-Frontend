import { Box, Stack } from '@mui/material';
import { Grid } from '@mui/system';
import { useWidth } from 'shared/model';
import { CompanyCard } from 'widgets/CompanyCard';
import { MyManager } from 'widgets/ManagerCard';
import { Notifications } from 'widgets/Notifications';
import { MyRecommends } from 'widgets/RecommendationsCard';
import { ServiceSection } from 'widgets/ServiceSection';

const MainPage = () => {
	const breakpointWidth = useWidth();
	return (
		<Stack gap={3}>
			<Stack spacing={2}>
				<Grid
					container
					columns={5}
					spacing={2}
				>
					<Grid
						size={{
							xl: 2,
							xs: 5,
						}}
						sx={{ minHeight: '192px' }}
					>
						<CompanyCard sx={{ height: '100%' }} />
					</Grid>
					<Grid
						size={1}
						sx={{ minHeight: '192px' }}
					>
						<Notifications sx={{ height: '100%' }} />
					</Grid>
					<Grid
						size={{
							xl: 2,
							xs: 4,
						}}
						sx={{ minHeight: '192px' }}
					>
						<MyManager sx={{ height: '100%' }} />
					</Grid>
				</Grid>
				<Grid
					container
					columns={5}
					columnSpacing={2}
					rowSpacing={2}
				>
					<Grid size={5}>
						<MyRecommends sx={{ minHeight: '337px' }} />
					</Grid>
				</Grid>
			</Stack>

			<Box
				component="section"
				position="relative"
			>
				<Box
					position="absolute"
					width={breakpointWidth}
					height="2px"
					sx={(theme) => ({
						background: `color-mix(in srgb, ${theme.palette.tertiary.main} 20%, transparent)`,
					})}
					left="-285px"
				/>
				<ServiceSection marginTop={4} />
			</Box>
		</Stack>
	);
};

export default MainPage;
