import { Skeleton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Suspense, useMemo } from 'react';
import { useMaxWidth } from 'shared/model';
import useGetUserServices from '../hooks/useGetUserServices';
import services from '../model/services';

const ServiceListWidget = () => {
	const { data: userServices, isLoading, isError } = useGetUserServices();
	const breakpoints = useMaxWidth();

	const activeServices = useMemo(() => {
		if (userServices) {
			return userServices['active_services'];
		}
	}, [userServices]);

	if (isLoading) {
		return (
			<Skeleton
				variant="rounded"
				width="100%"
				height="500px"
			/>
		);
	}

	if (isError) {
		return 'Ошибка при загрузке услуг.';
	}

	if (!activeServices.length) return null;

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
						sx={{
							width: 247,
							height: 247,
							color: 'tertiary.main',
						}}
						strokeWidth={20}
					/>
				</Box>

				<Stack
					gap={{ xl: 4, lg: 3, xs: 4 }}
					marginBottom="54px"
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

export default ServiceListWidget;
