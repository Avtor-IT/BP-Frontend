import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

export const MESSAGES_KEY = apiEndpoints.CHAT_MESSAGES;

const getMessages = async (chat_room_id, page = 1, page_size = 10) => {
	return await api.Get(apiEndpoints.CHAT_MESSAGES, {
		params: { page, page_size },
		urlParams: { chat_room_id },
	});
};

const dedupePagesById = (pages) => {
	/* Для исправления дедупа переписать логику пагинации на курсор, не pages */
	const seen = new Set();
	let changed = false;

	const nextPages = pages.map((page) => {
		if (!page?.results?.length) {
			return page;
		}

		const nextResults = [];
		let pageChanged = false;

		page.results.forEach((message) => {
			const id = message?.id;
			if (id == null) {
				nextResults.push(message);
				return;
			}

			if (seen.has(id)) {
				pageChanged = true;
				return;
			}

			seen.add(id);
			nextResults.push(message);
		});

		if (!pageChanged) {
			return page;
		}

		changed = true;
		return { ...page, results: nextResults };
	});

	return changed ? nextPages : pages;
};

const useMessages = (chat_room_id) =>
	useInfiniteQuery({
		queryKey: [MESSAGES_KEY, chat_room_id],
		queryFn: ({ pageParam }) => getMessages(chat_room_id, pageParam),
		getNextPageParam: (lastpage) => lastpage.next_page,
		select: (data) => {
			const pages = dedupePagesById(data.pages);
			if (pages === data.pages) {
				return data;
			}
			return { ...data, pages };
		},
		retry: false,
		staleTime: Infinity,
	});

export default useMessages;
