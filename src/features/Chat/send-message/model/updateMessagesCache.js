const normalizeIncomingMessage = (msg) => ({
	...msg,
	content: msg.content ?? msg.message,
});

const upsertMessageInPages = (pages, message) => {
	let found = false;
	const nextPages = pages.map((page) => {
		const messageIndex = page.results.findIndex(
			(item) => item.id === message.id
		);

		if (messageIndex === -1) {
			return page;
		}

		found = true;
		const nextResults = [...page.results];
		nextResults.splice(messageIndex, 1, {
			...page.results[messageIndex],
			...message,
		});

		return { ...page, results: nextResults };
	});

	return { found, pages: nextPages };
};

const prependMessageToFirstPage = (pages, message) => {
	if (!pages.length) return pages;

	const [first, ...rest] = pages;
	return [
		{
			...first,
			results: [message, ...first.results],
		},
		...rest,
	];
};

export const updateMessages = (oldData, msg) => {
	if (!oldData?.pages?.length) return oldData;

	const incoming = normalizeIncomingMessage(msg);
	const { found, pages } = upsertMessageInPages(oldData.pages, incoming);

	if (found) {
		return { ...oldData, pages };
	}

	const message = {
		...incoming,
		timestamp: incoming.timestamp ?? Date.now(),
	};

	return {
		...oldData,
		pages: prependMessageToFirstPage(pages, message),
	};
};
