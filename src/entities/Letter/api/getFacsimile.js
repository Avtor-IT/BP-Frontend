import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

const getFacsimile = async () => {
	return await api.Get(apiEndpoints.FACSIMILE_LIST);
};

export const useFacsimileList = () =>
	useQuery({
		queryFn: getFacsimile,
		queryKey: [apiEndpoints.FACSIMILE_LIST],
		staleTime: Infinity,
	});
