import { Skeleton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import cls from './ServiceBlock.module.scss';

const ServiceBlock = ({ serviceTitle, children = null }) => {
	return (
		<Stack
			className={cls.ServiceBlock}
			spacing={{ xs: '32px' }}
			marginBlock="54px"
			minHeight="520px"
		>
			<Typography variant="M32">
				{serviceTitle || (
					<Skeleton
						variant="text"
						height="60px"
					/>
				)}
			</Typography>

			{children || (
				<Skeleton
					variant="rectangular"
					height="520px"
				/>
			)}
		</Stack>
	);
};

export default ServiceBlock;
