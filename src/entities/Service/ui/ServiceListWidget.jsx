import { CardHeader, Skeleton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Suspense, useMemo } from 'react';
import { useMaxWidth } from 'shared/model';
import useUserServices from '../hooks/useUserServices';
import services from '../model/services';
import { Card } from 'shared/ui/Card';

const ServiceListWidget = () => {
	const { data: userServices, isLoading, isError } = useUserServices();
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

	return Object.entries(services).map(([id, service]) => {
		const isActive = activeServices.find((a) => a?.service === Number(id));

		if (!isActive) {
			return (
				<Card key={id}>
					<CardHeader
						title={`Сервис "${service.title}" не подключен`}
					/>
				</Card>
			);
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
