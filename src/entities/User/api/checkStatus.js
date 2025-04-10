import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

export const checkStatus = async () => {
	try {
		return api.Get(apiEndpoints.STATUS);
	} catch (_e) {
		throw Error('Status load failed');
	}
};
