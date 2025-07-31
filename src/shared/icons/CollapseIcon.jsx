import { SvgIcon } from '@mui/material';

const CollapseIcon = (props) => {
	return (
		<SvgIcon {...props}>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
			>
				<path
					d="M4 14H10M10 14V20M10 14L3 21M20 10H14M14 10V4M14 10L21 3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</SvgIcon>
	);
};

export default CollapseIcon;
