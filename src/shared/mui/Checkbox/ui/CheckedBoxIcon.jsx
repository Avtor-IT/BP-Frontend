import { styled } from '@mui/material';
import { BoxIconStyled } from './BoxIcon';

const BoxCheckedIconStyled = styled(BoxIconStyled)({
	backgroundColor: '#A43270',
	backgroundImage:
		'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
	'&::before': {
		display: 'block',
		width: '24px',
		height: '24px',
		backgroundImage:
			"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
			" fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
			"1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='white'/%3E%3C/svg%3E\")",
		content: '""',
	},
	'input:hover ~ &': {
		backgroundColor: '#992D68',
	},
});

const CheckedBoxIcon = ({ ...props }) => {
	return <BoxCheckedIconStyled {...props} />;
};

export default CheckedBoxIcon;
