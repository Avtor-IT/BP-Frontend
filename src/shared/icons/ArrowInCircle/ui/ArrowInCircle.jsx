import { SvgIcon } from '@mui/material';

const ArrowInCircle = (props) => {
	return (
		<SvgIcon {...props}>
			<svg
				fill="none"
				viewBox="0 0 32 32"
				stroke="currentColor"
			>
				<rect
					x="1"
					y="1"
					width="30"
					height="30"
					rx="15"
				/>
				<path
					d="M13 22L19 16L13 10"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</SvgIcon>
	);
};

export default ArrowInCircle;
