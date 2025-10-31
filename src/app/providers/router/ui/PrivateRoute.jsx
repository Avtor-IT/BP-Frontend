import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from 'app/layout/Layout';
import { useCheckStatus } from 'entities/User';
import { FallbackPage } from 'pages/FallbackPage';

const PrivateRoute = ({ children }) => {
	const navigate = useNavigate();

	const statusQuery = useCheckStatus();

	useLayoutEffect(() => {
		if (statusQuery.data) {
			const isAuthenticated = statusQuery.data.is_authenticated;
			if (!isAuthenticated) {
				navigate('/login', { replace: true });
			}
		}
		if (statusQuery.error) {
			navigate('/login', { replace: true });
		}
	}, [navigate, statusQuery]);

	if (statusQuery.isPending || statusQuery.isLoading || !statusQuery.data)
		return <FallbackPage />;

	if (!children) {
		return <Layout />;
	}

	return { children };
};

export default PrivateRoute;
