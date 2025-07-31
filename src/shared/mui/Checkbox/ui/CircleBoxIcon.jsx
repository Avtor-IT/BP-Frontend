import { CircleIcon } from 'shared/icons/Circle';

const CircleBoxIcon = (props) => {
	return (
		<CircleIcon
			{...props}
			sx={{
				color: 'textSecondary.default',
				'input:hover ~ &': {
					color: props.color || 'primary.main',
				},
				transition: 'all .2s ease',
				...props.sx,
			}}
		/>
	);
};

export default CircleBoxIcon;
