import ArrowIcon from './ArrowIcon';

const ArrowIconDown = (props) => {
	return (
		<ArrowIcon
			{...props}
			sx={{ transform: 'rotate(90deg)', ...props.sx }}
		/>
	);
};

export default ArrowIconDown;
