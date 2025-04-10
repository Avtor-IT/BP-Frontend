import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

export const login = async (body) => {
	try {
		const response = await api.Post(apiEndpoints.JWT_CREATE, body);

		if (response?.access) {
			sessionStorage.setItem('access', response.access);
			sessionStorage.setItem('refresh', response.refresh);
			return response.access;
		}
		return response;
	} catch (e) {
		console.error('Login failed:', e);
		if (e.response.status === 401) {
			throw Error('Unauthorized');
		}
		throw Error(e.response.status);
	}
};
