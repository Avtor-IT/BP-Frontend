import { Card, CardHeader, Stack } from '@mui/material';
import { useGetUserServices } from 'entities/Service';
import services from '../model/services';
import { useMemo } from 'react';
import { useMinWidth } from 'shared/model/index.js';

const ServiceAnchorList = () => {
	const breakpoints = useMinWidth();

	const { data: userServices } = useGetUserServices();
	const activeServices = useMemo(() => {
		if (userServices) {
			return userServices['active_services'];
		}
	}, [userServices]);

	if (!breakpoints.xl) return null;
	if (!activeServices?.length) return null;

	return (
		<Stack
			direction={breakpoints.lg ? 'column' : 'row'}
			gap={2}
		>
			{activeServices.map(({ service: id }) => {
				const service = services[id];

				if (!service) {
					return null;
				}

				return (
					<Card
						key={id}
						component="a"
						href={`#${service.htmlId}`}
						sx={{
							maxWidth: breakpoints.lg ? '100%' : '170px',
							paddingBlock: '16px !important',
							display: 'flex',
							alignItems: breakpoints.lg ? 'start' : 'center',
							justifyContent: 'center',
							borderRadius: breakpoints.lg ? 2 : 4,
							minHeight: breakpoints.lg ? '67px' : 0,
						}}
					>
						<CardHeader
							title={service.title}
							slotProps={{ title: { variant: 'M16' } }}
							sx={{ paddingInline: 2 }}
						/>
					</Card>
				);
			})}
		</Stack>
	);
};

export default ServiceAnchorList;
