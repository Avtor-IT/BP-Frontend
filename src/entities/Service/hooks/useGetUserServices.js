import { useQuery } from '@tanstack/react-query';
import getUserServices from '../api/getUserServices';

const useGetUserServices = () =>
	useQuery({
		queryKey: ['user_services'],
		queryFn: getUserServices,
	});

export default useGetUserServices;
