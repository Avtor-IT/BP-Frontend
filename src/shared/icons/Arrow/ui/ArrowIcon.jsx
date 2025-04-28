import { SvgIcon } from '@mui/material';

const ArrowIcon = (props) => {
	return (
		<SvgIcon {...props}>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				strokeWidth={props.strokeWidth || 1}
				stroke="currentColor"
			>
				<path
					d="M8.94998 19.9201L15.47 13.4001C16.24 12.6301 16.24 11.3701 15.47 10.6001L8.94999 4.08008"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</SvgIcon>
	);
};

export default ArrowIcon;
