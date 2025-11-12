import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';
import { KEY as LETTERS_LIST_KEY } from './getLetters';

const KEY = apiEndpoints.DELETE_LETTER;

const deleteLetter = async (letter_id) => {
	return await api.Delete(apiEndpoints.DELETE_LETTER, {
		urlParams: { letter_id },
	});
};

export const useDeleteLetter = () => {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: async (id) => await deleteLetter(id),
		mutationKey: [KEY],

		onMutate: async (id) => {
			await qc.cancelQueries({ queryKey: [LETTERS_LIST_KEY] });

			const previous = qc.getQueriesData({
				queryKey: [LETTERS_LIST_KEY],
			});

			if (!previous) return { previous };

			previous.forEach(([queryKey, data]) => {
				if (!data) return data;

				const newPages = data.pages.map((page) => {
					if (!Array.isArray(page.results)) return page;

					const index = page.results.findIndex((l) => l.id === id);

					const newPage = [...page.results];

					if (index) {
						newPage.splice(index, 1);
					}

					return {
						...page,
						count: page.count - 1,
						results: newPage,
					};
				});

				const newData = { ...data, pages: newPages };

				qc.setQueryData(queryKey, newData);
			});

			// snapshot for onError handler
			return { previous };
		},

		onError: (_err, _variables, context) => {
			// backup to snapshot
			if (context?.previous) {
				qc.setQueryData([LETTERS_LIST_KEY], context.previous);
			}
		},
	});
};
