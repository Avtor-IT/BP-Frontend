import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import cls from './SectionTitle.module.scss';

const SectionTitle = ({ children, ...props }) => {
	return (
		<Box
			{...props}
			paddingBlock="51px"
			className={cls.TitleBox}
		>
			<Typography variant="M40">{children}</Typography>
		</Box>
	);
};

export default SectionTitle;
