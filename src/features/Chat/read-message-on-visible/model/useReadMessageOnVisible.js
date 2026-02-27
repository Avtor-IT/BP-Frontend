import { useCallback, useEffect, useRef } from 'react';
import { useReadMessage } from 'entities/Chat';

export const useReadMessageOnVisible = (chatId, type) => {
	const { mutateAsync } = useReadMessage(chatId, type);
	const readMessagesRef = useRef(new Set());
	const mutateAsyncRef = useRef(mutateAsync);

	useEffect(() => {
		mutateAsyncRef.current = mutateAsync;
	}, [mutateAsync]);

	useEffect(() => {
		readMessagesRef.current.clear();
	}, [chatId, type]);

	return useCallback(
		async (message) => {
			if (
				message.sender_type === 'b24' &&
				!message.read &&
				!readMessagesRef.current.has(message.id)
			) {
				readMessagesRef.current.add(message.id);

				try {
					await mutateAsyncRef.current(message.id);
				} catch {
					readMessagesRef.current.delete(message.id);
				}
			}
		},
		[]
	);
};
