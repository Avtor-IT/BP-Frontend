import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

const KEY = apiEndpoints.USER_SERVICES;

const getUserServices = async () => {
	return await api.Get(apiEndpoints.USER_SERVICES);
};

const useUserServices = () =>
	useQuery({
		queryKey: [KEY],
		queryFn: getUserServices,
	});

export default useUserServices;
