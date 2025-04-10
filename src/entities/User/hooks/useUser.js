import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../api/getCurrentUser';

const useUser = () => {
	return useQuery({
		queryFn: getCurrentUser,
		queryKey: ['users', 'current'],
		staleTime: 1000 * 5 * 60,
	});
};

export default useUser;
