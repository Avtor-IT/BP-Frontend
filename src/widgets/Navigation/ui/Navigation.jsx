import { Button, Stack, Typography } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/system';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Document from 'shared/icons/Document';
import HomeIcon from 'shared/icons/Home';
import ListIcon from 'shared/icons/List';
import Market from 'shared/icons/Market';
import OfficeIcon from 'shared/icons/Office';
import { AppRoutes, RoutePath } from 'shared/router';

const styles = (isActive) => ({
	justifyContent: 'start',
	backgroundColor: isActive ? 'primary.main' : 'transparent',
	borderRadius: '8px',
	boxSizing: 'border-box',

	'&:hover': {
		backgroundColor: isActive ? 'primary.main' : 'transparent',
	},
	'&:active': {
		boxShadow: 'none',
	},
	'&:not(.nav--active)::before': {
		borderLeft: '3px solid',
		borderColor: 'transparent',
		borderRadius: 'inherit',
		display: 'block',
		content: '""',
		position: 'absolute',
		left: '-3px',
		background: 'transparent',
		height: '100%',
		width: '100%',
		transition: 'border-color 0.2s ease, left 0.2s ease',
	},

	'&:not(.nav--active):hover::before': {
		borderColor: 'primary.main',
		left: '0',
	},
});

const navIcon = (el, isActive) => (
	<Stack
		justifyContent="center"
		sx={{
			'& svg': {
				stroke: isActive ? 'white' : 'currentColor',
			},
		}}
	>
		{el.icon}
	</Stack>
);

export const Navigation = ({ ...props }) => {
	const theme = useTheme();
	const downXxxl = useMediaQuery(theme.breakpoints.down('xxxl'));

	const navigate = useNavigate();
	const location = useLocation();

	const menu = {
		list: [
			{
				title: 'Главная',
				link: RoutePath[AppRoutes.MAIN],
				icon: <HomeIcon />,
			},
			{
				title: 'Моя компания',
				link: RoutePath[AppRoutes.COMPANY],
				icon: <ListIcon />,
			},
			{
				title: 'Маркетплейс',
				link: RoutePath[AppRoutes.MARKET],
				icon: <Market />,
			},
			{
				title: 'Конструктор письма',
				link: RoutePath[AppRoutes.LETTER],
				icon: <Document />,
			},
			{
				title: 'Чаты',
				link: RoutePath[AppRoutes.CHATS],
				icon: <OfficeIcon />,
			},
		],
	};

	return (
		<Stack
			component="aside"
			gap={{ xxl: 1, xs: 2 }}
			sx={(theme) => ({
				[theme.breakpoints.up('xxxl')]: {
					paddingInline: 2,
				},
				[theme.breakpoints.down('xxl')]: {
					flexDirection: 'row',
				},
				width: '100%',
				...props.sx,
			})}
			{...props}
		>
			{menu.list.map((el) => {
				const isActive =
					el.link === RoutePath[AppRoutes.MAIN]
						? location.pathname === el.link
						: location.pathname.startsWith(el.link);

				return (
					<Button
						className={isActive ? 'nav--active' : ''}
						key={el.link}
						component={Link}
						to={el.link}
						variant={isActive ? 'contained' : 'text'}
						onClick={() => {
							navigate(el.link);
						}}
						fullWidth
						sx={(theme) => ({
							...styles(isActive),
							color: 'textSecondary.default',
							paddingLeft: '12px',
							[theme.breakpoints.down('xxl')]: {
								justifyContent: 'center',
								paddingInline: 1,
							},
						})}
						startIcon={navIcon(el, isActive)}
					>
						<Typography
							variant={downXxxl ? 'L12' : 'L16'}
							color={
								isActive
									? 'primary.contrastText'
									: 'textSecondary'
							}
						>
							{el.title}
						</Typography>
					</Button>
				);
			})}
		</Stack>
	);
};
