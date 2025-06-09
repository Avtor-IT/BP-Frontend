import { Link } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/router';

export const LogoLink = ({ children, ...props }) => {
	return (
		<Link
			to={RoutePath[AppRoutes.MAIN]}
			{...props}
		>
			{children}
		</Link>
	);
};
