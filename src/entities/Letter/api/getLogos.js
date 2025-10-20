import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

const getLogos = async () => {
	return await api.Get(apiEndpoints.LOGOS_LIST);
};

export const useLogoList = () =>
	useQuery({
		queryFn: getLogos,
		queryKey: [apiEndpoints.LOGOS_LIST],
		staleTime: Infinity,
	});
