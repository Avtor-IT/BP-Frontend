import { useImportantMessages } from 'entities/Chat';

export const useRecommendationsHistory = () => {
	return useImportantMessages(2);
};
