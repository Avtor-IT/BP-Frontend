import { useImportantMessages } from 'entities/Chat';

export const useActualRecommendation = () => {
	const { data: messageArray, ...rest } = useImportantMessages(2, 1);
	return { data: messageArray?.[0], ...rest };
};
