import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { authStorage } from 'shared/api/lib';
import { apiEndpoints } from 'shared/model';

export const KEY = apiEndpoints.STATUS;

const checkStatus = async () => {
	try {
		if (!authStorage.checkSession()) {
			throw Error('Unauthorized');
		}
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
