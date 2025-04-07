import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useGetUserServices } from 'entities/Service';
import { useWidth } from 'shared/model';
import SectionTitle from 'shared/ui/SectionTitle';
import RenderServiceById from './RenderServiceById';
import ServiceBlock from './ServiceBlock';

const renderServices = (services) =>
	services.map(({ service }) => (
		<RenderServiceById
			key={service}
			id={service}
		/>
	));
const renderSkeleton = () =>
	Array.from({ length: 4 }).map((_, i) => <ServiceBlock key={i} />);

const ServiceSection = ({ ...props }) => {
	const breakpointWidth = useWidth();

	const {
		data: userServices,
		error: userServicesError,
		isPending: isUserServicesPending,
	} = useGetUserServices();

	if (isUserServicesPending) {
		return (
			<Box
				component="section"
				{...props}
			>
				<SectionTitle>Мои услуги</SectionTitle>
				{renderSkeleton()}
			</Box>
		);
	}

	if (userServicesError) {
		return (
			<Box
				component="section"
				{...props}
			>
				<SectionTitle>Мои услуги</SectionTitle>
				<Typography>Ошибка при загрузке услуг</Typography>
			</Box>
		);
	}

	return (
		<Box
			component="section"
			position="relative"
			{...props}
		>
			<Box
				position="absolute"
				width={breakpointWidth}
				height="2px"
				bgcolor={'color-mix(in srgb, var(--tertiary) 20%, transparent)'}
				left="-285px"
			/>
			<SectionTitle>Мои услуги</SectionTitle>

			{renderServices(userServices['active_services'])}
		</Box>
	);
};

export default ServiceSection;
