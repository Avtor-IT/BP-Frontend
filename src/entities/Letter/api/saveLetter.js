import { useMutation } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

const createLetter = async (data) => {
	return await api.Post(apiEndpoints.CREATE_LETTER, data);
};

export const useCreateLeter = (config) =>
	useMutation({
		mutationFn: createLetter,
		mutationKey: [apiEndpoints.CREATE_LETTER],
		...config,
	});
