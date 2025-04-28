import { SvgIcon } from '@mui/material';

const MessageIcon = (props) => {
	return (
		<SvgIcon {...props}>
			<svg
				fill="none"
				stroke="currentColor"
			>
				<path d="M16 2H8C4 2 2 4 2 8V21C2 21.55 2.45 22 3 22H16C20 22 22 20 22 16V8C22 4 20 2 16 2Z" />
				<path d="M7 9.5H17" />
				<path d="M7 14.5H14" />
			</svg>
		</SvgIcon>
	);
};

export default MessageIcon;
