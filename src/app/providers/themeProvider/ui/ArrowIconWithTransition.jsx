import { ArrowIconDown } from 'shared/icons/Arrow';

const ArrowIconWithTransition = (props) => (
	<ArrowIconDown
		{...props}
		sx={{ transition: 'all .1s ease' }}
		strokeWidth={2}
	/>
);

export default ArrowIconWithTransition;
