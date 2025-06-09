import { SvgIcon } from '@mui/material';

const Menu = (props) => {
	return (
		<SvgIcon {...props}>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
			>
				<path
					d="M3 12H21M3 6H21M3 18H21"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</SvgIcon>
	);
};

export default Menu;
