import { useEffect, useRef, useState } from 'react';
import { useUploadedFiles } from 'entities/Documents';

export const MESSAGE_TYPES = {
	USER: 'user',
	B24: 'b24',
	IMPORTANT: 'important',
};

export const useMessageItem = ({ message, onMessageVisible }) => {
	const messageRef = useRef(null);
	const [openedFile, setOpenedFile] = useState(null);

	const attachedIds = message.attached_ids ?? [];
	const fileQueries = useUploadedFiles(attachedIds);

	const messageType = message.is_important
		? MESSAGE_TYPES.IMPORTANT
		: message.sender_type === MESSAGE_TYPES.USER
		? MESSAGE_TYPES.USER
		: MESSAGE_TYPES.B24;

	useEffect(() => {
		const element = messageRef.current;
		if (!element) return undefined;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						onMessageVisible?.(message);
					}
				});
			},
			{ rootMargin: '0px' }
		);

		observer.observe(element);

		return () => {
			observer.disconnect();
		};
	}, [message, onMessageVisible]);

	return {
		messageRef,
		messageType,
		fileQueries,
		openedFile,
		openFile: setOpenedFile,
		closeFile: () => setOpenedFile(null),
	};
};
