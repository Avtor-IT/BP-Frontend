import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';
import { KEY as GET_IMPORTANT_MESSAGES_KEY } from './getImportantMessages';

export const KEY = apiEndpoints.MARK_DONE;

const markDone = async (messageId, done) => {
	return await api.Post(
		apiEndpoints.MARK_DONE,
		{
			value: done,
		},
		{ urlParams: { message_id: messageId } }
	);
};

export const useMarkDone = () => {
	return useMutation({
		mutationFn: async ({ messageId, done }) =>
			await markDone(messageId, done),
		mutationKey: [KEY],
		onSuccess: () => {
			/* Добавить optimistic update для GET_IMPORTANT_MESSAGES_KEY */
		},
	});
};
