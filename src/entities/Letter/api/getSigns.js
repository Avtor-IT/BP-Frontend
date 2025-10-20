import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

const getSigns = async () => {
	return await api.Get(apiEndpoints.SIGNS_LIST);
};

export const useSignsList = () =>
	useQuery({
		queryFn: getSigns,
		queryKey: [apiEndpoints.SIGNS_LIST],
		staleTime: Infinity,
	});
