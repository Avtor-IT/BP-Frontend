import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

export const getCurrentUser = async () => {
	try {
		return await api.Get(apiEndpoints.ME);
	} catch (_e) {
		throw Error('Current user failed');
	}
};
