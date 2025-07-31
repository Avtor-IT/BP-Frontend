import MTab from '@mui/material/Tab';

const Tab = (props) => {
	const { variant, ...other } = props;

	return (
		<MTab
			{...other}
			sx={[
				variant === 'card' &&
					((theme) => ({
						borderRadius: 1,
						...theme.cardShadow,
					})),
				...(Array.isArray(other.sx) ? other.sx : [other.sx]),
			]}
		/>
	);
};

export default Tab;
