import { useCallback, useRef } from 'react';
import { useReadMessage } from 'entities/Chat';

export const useReadMessageOnVisible = (chatId) => {
	const readMessageMutation = useReadMessage(chatId);
	const readMessagesRef = useRef(new Set());

	return useCallback(
		async (message) => {
			if (
				message.sender_type === 'b24' &&
				!message.read &&
				!readMessagesRef.current.has(message.id)
			) {
				await readMessageMutation.mutateAsync(message.id);
				readMessagesRef.current.add(message.id);
			}
		},
		[readMessageMutation]
	);
};
