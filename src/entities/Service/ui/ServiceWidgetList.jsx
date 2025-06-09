import { Skeleton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useGetUserServices } from 'entities/Service/';
import services from '../model/services';
import { useMinWidth } from 'shared/model';
import { Suspense, useMemo } from 'react';

const ServiceWidgetList = () => {
	const { data: userServices } = useGetUserServices();
	const breakpoints = useMinWidth();

	const activeServices = useMemo(() => {
		if (userServices) {
			return userServices['active_services'];
		}
	}, [userServices]);

	if (!activeServices?.length) return null;

	return activeServices.map(({ service: id }) => {
		const service = services[id];

		if (!service) {
			return null;
		}

		return (
			<Box
				id={service.htmlId}
				position="relative"
				key={id}
			>
				<Box
					position="absolute"
					left={-37}
					top="50%"
					sx={{ transform: 'translate(-100%, -50%)' }}
				>
					<service.icon
						width={247}
						height={247}
						stroke="var(--tertiary)"
						strokeWidth={20}
					/>
				</Box>

				<Stack
					gap={{ xl: 4, lg: 3, xs: 4 }}
					marginBlock="54px"
					minHeight="520px"
				>
					<Typography
						variant={
							breakpoints.xl
								? breakpoints.lg
									? 'M20'
									: 'M24'
								: 'M32'
						}
					>
						{service.title}
					</Typography>

					<Suspense
						fallback={
							<Skeleton
								variant="rounded"
								height="500px"
							/>
						}
					>
						<service.component />
					</Suspense>
				</Stack>
			</Box>
		);
	});
};

export default ServiceWidgetList;
