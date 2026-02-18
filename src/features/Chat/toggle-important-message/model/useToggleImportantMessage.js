import { useMarkDone } from 'entities/Chat';

export const useToggleImportantMessage = () => {
	const mutation = useMarkDone();

	return {
		...mutation,
		toggle: (messageId, done) =>
			mutation.mutate({ messageId, done: !done }),
	};
};
