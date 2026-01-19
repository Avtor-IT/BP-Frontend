import { IconButton, Stack, TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from 'entities/User';
import { useEffect, useRef, useState } from 'react';
import { apiEndpoints } from 'shared/model';
import { CHAT_LIST_KEY } from '..';
import { useChatWS } from '../api/chatWebSocket';
import { PaperClipIcon } from 'shared/icons/Paperclip';
import { ArrowEnterIcon } from 'shared/icons/ArrowEnter';

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

const updateMessages = (oldData, msg) => {
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

const SendMessageForm = ({ roomId, type }) => {
	const queryClient = useQueryClient();

	const [message, setMessage] = useState('');
	const handleMessageChange = (event) => {
		setMessage(event.target.value);
	};
	const lastMessageRef = useRef(null);

	const {
		data: user,
		isLoading: _isUserLoading,
		isError: _isUserError,
	} = useUser();

	const {
		sendMessage: sendWSMessage,
		lastJsonMessage,
		lastMessage,
		isConnecting,
		isClosed,
	} = useChatWS({
		roomId,
		type,
	});

	const onMessageHandler = (lastJsonMessage) => {
		const msg = lastJsonMessage;

		console.log(msg);

		queryClient.setQueryData(
			[apiEndpoints.CHAT_MESSAGES, roomId],
			(oldData) => updateMessages(oldData, msg)
		);
		queryClient.invalidateQueries({ queryKey: [CHAT_LIST_KEY] });
	};

	const sendMessage = (e) => {
		e.preventDefault();

		const msg = {
			message,
			sender_id: user.contactId,
		};

		sendWSMessage(JSON.stringify(msg));
		setMessage('');
	};

	useEffect(() => {
		if (lastMessage && lastMessage !== lastMessageRef.current) {
			lastMessageRef.current = lastMessage;
			onMessageHandler(lastJsonMessage);
		}
	}, [lastMessage]);

	return (
		<form onSubmit={sendMessage}>
			<Stack
				direction="row"
				gap={2}
			>
				<TextField
					value={message}
					onChange={handleMessageChange}
					fullWidth
					placeholder={isClosed ? 'Ошибка подключения' : 'Сообщение'}
					autoFocus
					variant="filled"
					slotProps={{
						input: {
							startAdornment: (
								<IconButton color="textPrimary.default">
									<PaperClipIcon />
								</IconButton>
							),
							endAdornment: (
								<IconButton
									color="textPrimary.default"
									type="submit"
									disabled={
										!message || isClosed || isConnecting
									}
								>
									<ArrowEnterIcon />
								</IconButton>
							),
							sx: {
								borderRadius: 4,
								'& input': {
									paddingBlock: 2,
									typography: 'R20',
								},
							},
						},
					}}
				/>
			</Stack>
		</form>
	);
};

export default SendMessageForm;
