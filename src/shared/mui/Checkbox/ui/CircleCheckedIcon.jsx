import CheckCircleIcon from 'shared/icons/CheckCircle';

export const CircleCheckedIcon = (props) => {
	return (
		<CheckCircleIcon
			{...props}
			sx={{
				color: props.color || 'primary.main',
				'input:hover ~ &': {},
				...props.sx,
			}}
		/>
	);
};

export default CircleCheckedIcon;
