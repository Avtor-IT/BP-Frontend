import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

export const KEY = apiEndpoints.LETTERS_LIST;

const fetchLetters = async ({ pageParam = 1 }) => {
	const res = await api.Get(KEY, {
		params: { page: pageParam },
	});
	return res;
};

const useLetters = () => {
	const query = useInfiniteQuery({
		queryKey: [KEY],
		queryFn: fetchLetters,
		getNextPageParam: (lastPage) => lastPage?.next_page ?? undefined,
		staleTime: Infinity,
	});

	const flatData = query.data?.pages.flatMap((p) => p.results) ?? [];

	return {
		...query,
		data: flatData,
		// pages: query.data?.pages // если потребуется доступ к страницам
	};
};

export default useLetters;
