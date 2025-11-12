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
	const qc = useQueryClient();

	return useMutation({
		mutationKey: [KEY],
		mutationFn: async ({ messageId, done }) =>
			await markDone(messageId, done),

		onMutate: async ({ messageId, done }) => {
			await qc.cancelQueries({
				queryKey: [GET_IMPORTANT_MESSAGES_KEY],
				exact: false,
			});

			const previous = qc.getQueriesData({
				queryKey: [GET_IMPORTANT_MESSAGES_KEY],
			});

			previous.forEach(([queryKey, data]) => {
				if (!data) return;
				qc.setQueryData(queryKey, (old) => {
					if (!old) return old;
					return old.map((m) =>
						m.id === messageId ? { ...m, done } : m
					);
				});
			});

			// return snapshot for onError handler
			return { previous };
		},

		onError: (err, variables, context) => {
			if (context.previous) {
				context.previous.forEach(([queryKey, data]) => {
					qc.setQueryData(queryKey, data);
				});
			}
		},
	});
};
