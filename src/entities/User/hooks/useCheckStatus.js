import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

export const KEY = apiEndpoints.STATUS;

const checkStatus = async () => {
	try {
		return api.Get(apiEndpoints.STATUS);
	} catch (_e) {
		throw Error('Status load failed');
	}
};

const useCheckStatus = () => {
	return useQuery({
		queryFn: checkStatus,
		queryKey: [apiEndpoints.STATUS],
		retry: false,
	});
};

export default useCheckStatus;
