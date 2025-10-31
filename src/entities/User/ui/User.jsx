import { Box } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/ui/Button';
import useUser from '../hooks/useUser';
import { authStorage } from 'shared/api/lib';

const User = () => {
	const { data, isLoading } = useUser();
	const navigate = useNavigate();

	const queryClient = useQueryClient();

	const logout = () => {
		queryClient.clear();
		authStorage.clearSession();

		navigate('/login', { replace: true });
	};

	if (isLoading) return <Box>Загрузка пользователя...</Box>;

	return (
		<>
			{data.username}
			<Button onClick={logout}>Выйти</Button>
		</>
	);
};

export default User;
