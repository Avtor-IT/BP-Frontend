import { SvgIcon } from '@mui/material';

const HomeIcon = (props) => {
	return (
		<SvgIcon {...props}>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
			>
				<path
					d="M9.02 2.84016L3.63 7.04016C2.73 7.74016 2 9.23016 2 10.3602V17.7702C2 20.0902 3.89 21.9902 6.21 21.9902H17.79C20.11 21.9902 22 20.0902 22 17.7802V10.5002C22 9.29016 21.19 7.74016 20.2 7.05016L14.02 2.72016C12.62 1.74016 10.37 1.79016 9.02 2.84016Z"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M10.5 18H13.5C15.15 18 16.5 16.65 16.5 15V12C16.5 10.35 15.15 9 13.5 9H10.5C8.85 9 7.5 10.35 7.5 12V15C7.5 16.65 8.85 18 10.5 18Z"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M12 9V18"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M7.5 13.5H16.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</SvgIcon>
	);
};

export default HomeIcon;
