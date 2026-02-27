import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';
import { MESSAGES_KEY } from './getMessages';
import { KEY as COUNT_KEY } from './messagesCount';

export const KEY = apiEndpoints.READ_MESSAGE;

const readMessage = async (message_id) => {
	return await api.Post(
		apiEndpoints.READ_MESSAGE,
		{},
		{ urlParams: { message_id } }
	);
};

const useReadMessage = (chat_room_id, type) => {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: async (message_id) => await readMessage(message_id),
		mutationKey: [KEY, chat_room_id, type],
		onSuccess: (result) => {
			qc.setQueryData([MESSAGES_KEY, chat_room_id, type], (oldData) => {
				const newPages = oldData.pages.map((page) => {
					const messageIndex = page.results.findIndex(
						(message) => message.id === result.message_id
					);

					if (messageIndex === -1) {
						return page;
					}

					const newMessages = [...page.results];
					newMessages.splice(messageIndex, 1, {
						...page.results[messageIndex],
						read: true,
					});

					qc.invalidateQueries({ queryKey: [COUNT_KEY] });
					return { ...page, results: newMessages };
				});

				return { ...oldData, pages: newPages };
			});
		},
	});
};

export default useReadMessage;
