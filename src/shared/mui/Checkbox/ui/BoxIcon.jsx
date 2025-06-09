import { styled } from '@mui/material';

export const BoxIconStyled = styled('span')(({ theme }) => ({
	borderRadius: 4,
	width: 24,
	height: 24,
	backgroundColor: '#D9D9D9',
	'.Mui-focusVisible &': {
		outline: '2px auto rgba(19,124,189,.6)',
		outlineOffset: 2,
	},
	'input:hover ~ &': {
		...theme.applyStyles('dark', {
			backgroundColor: '#D9D9D9',
		}),
	},
	'input:disabled ~ &': {
		boxShadow: 'none',
		backgroundColor: '#D9D9D9BD',
	},
}));

const BoxIcon = () => {
	return <BoxIconStyled />;
};

export default BoxIcon;
