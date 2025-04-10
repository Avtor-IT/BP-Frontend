import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

const getManager = async () => {
	try {
		const data = await api.Get(apiEndpoints.MANAGER);
		return data.result[0];
	} catch (e) {
		throw Error(e);
	}
};

export const useManager = () =>
	useQuery({
		queryKey: ['manager'],
		queryFn: getManager,
		staleTime: Infinity,
		// enabled: false, // Чтобы ошибки глаза не мозолили
	});
