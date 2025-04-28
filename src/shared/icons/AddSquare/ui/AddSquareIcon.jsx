import { SvgIcon } from '@mui/material';

const AddSquareIcon = (props) => {
	return (
		<SvgIcon {...props}>
			<svg
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1}
				stroke="currentColor"
			>
				<path
					d="M8 12H16"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M12 16V8"
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

export default AddSquareIcon;
