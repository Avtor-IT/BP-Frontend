import { SvgIcon } from '@mui/material';

const UpDown = (props) => {
	return (
		<SvgIcon {...props}>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
			>
				<path
					d="M10.4498 6.71997L6.72974 3L3.00977 6.71997"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M6.73047 21V3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M13.5488 17.2803L17.2689 21.0002L20.9888 17.2803"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M17.2695 3V21"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</SvgIcon>
	);
};

export default UpDown;
