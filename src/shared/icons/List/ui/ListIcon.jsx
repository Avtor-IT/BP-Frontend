import { SvgIcon } from '@mui/material';

const ListIcon = (props) => {
	return (
		<SvgIcon {...props}>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
			>
				<path
					d="M12.37 8.87988H17.62"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M6.38 8.87988L7.13 9.62988L9.38 7.37988"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M12.37 15.8799H17.62"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M6.38 15.8799L7.13 16.6299L9.38 14.3799"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</SvgIcon>
	);
};

export default ListIcon;
