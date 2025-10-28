import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';
import { KEY as STATUS_KEY } from 'entities/User';

const KEY = apiEndpoints.JWT_CREATE;

const login = async (body) => {
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
		if (e.response?.status === 401) {
			throw Error('Unauthorized');
		}
		throw Error(e.response?.status);
	}
};

const useLoginMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (params) => await login(params),
		mutationKey: [KEY],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [STATUS_KEY] });
		},
	});
};

export default useLoginMutation;
