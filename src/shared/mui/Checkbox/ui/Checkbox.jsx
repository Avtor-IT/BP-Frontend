import { Checkbox as MCheckbox } from '@mui/material';
import CircleCheckedIcon from './CircleCheckedIcon';
import CircleBoxIcon from './CircleBoxIcon';
import BoxIcon from './BoxIcon';
import CheckedBoxIcon from './CheckedBoxIcon';

const Checkbox = (props) => {
	if (props.variant === 'circle') {
		return (
			<MCheckbox
				disableRipple
				checkedIcon={<CircleCheckedIcon {...props} />}
				icon={<CircleBoxIcon {...props} />}
				{...props}
			/>
		);
	}

	return (
		<MCheckbox
			disableRipple
			checkedIcon={<BoxIcon {...props} />}
			icon={<CheckedBoxIcon {...props} />}
			{...props}
		/>
	);
};

export default Checkbox;
