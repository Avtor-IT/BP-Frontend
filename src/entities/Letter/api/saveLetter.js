import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';
import { KEY as LETTERS_LIST_KEY } from './getLetters';

const createLetter = async (data) => {
	return await api.Post(apiEndpoints.CREATE_LETTER, data);
};

export const useCreateLeter = (config) => {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: createLetter,
		mutationKey: [apiEndpoints.CREATE_LETTER],

		onMutate: async (newLetter) => {
			await qc.cancelQueries({ queryKey: [LETTERS_LIST_KEY] });

			const previous = qc.getQueriesData({
				queryKey: [LETTERS_LIST_KEY],
			});

			if (!previous) return { previous };

			previous.forEach(([queryKey, data]) => {
				if (!data) return data;

				const newId = data.pages[0].results[0]?.id ? +1 : 1;
				const newPage = [
					{ ...newLetter, id: newId },
					...data.pages[0].results,
				];

				// const newPages = data.pages
				// const newData = { ...data, pages:  };
				// qc.setQueryData(queryKey, newData);
			});

			await config?.onMutate?.(newLetter);

			// snapshot for onError handler
			return { previous };
		},

		...config,
	});
};
