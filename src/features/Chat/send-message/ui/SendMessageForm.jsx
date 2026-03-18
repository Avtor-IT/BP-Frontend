import { Chip, IconButton, Stack, TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from 'entities/User';
import { useEffect, useRef, useState } from 'react';
import {
	CHAT_TYPE,
	DEPARTMENT_CHAT_KEY,
	MANAGER_CHAT_KEY,
} from 'entities/Chat';
import { useChatWS } from '../model/useChatWS';
import { updateMessages } from '../model/updateMessagesCache';
import { PaperClipIcon } from 'shared/icons/Paperclip';
import { ArrowEnterIcon } from 'shared/icons/ArrowEnter';
import { usePrepareAndUploadFile } from 'entities/Documents';
import { MESSAGES_KEY } from 'entities/Chat';

const SendMessageForm = ({ roomId, type }) => {
	const queryClient = useQueryClient();

	const uploadedFiles = useRef([]);
	const { mutate } = usePrepareAndUploadFile({
		onSuccess: (data) => {
			uploadedFiles.current = [...uploadedFiles.current, data.result.ID];
		},
	});

	const [message, setMessage] = useState('');
	const handleMessageChange = (event) => {
		setMessage(event.target.value);
	};
	const lastMessageRef = useRef(null);
	const inputRef = useRef(null);
	const [files, setFiles] = useState([]);

	const handleFiles = async (newFiles) => {
		if (!newFiles) return;
		setFiles((prev) => [...prev, ...Array.from(newFiles)]);
	};

	const deleteFile = (index) => {
		setFiles((prev) => prev.filter((_, i) => i !== index));
	};

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

		queryClient.setQueryData([MESSAGES_KEY, roomId, type], (oldData) =>
			updateMessages(oldData, msg)
		);

		queryClient.invalidateQueries({
			queryKey: [
				type === CHAT_TYPE.MANAGER
					? MANAGER_CHAT_KEY
					: DEPARTMENT_CHAT_KEY,
			],
		});
	};

	const uploadFiles = (files, params) =>
		new Promise((resolve) => {
			files.forEach((rawFile) => {
				mutate(
					{ rawFile },
					{
						onSettled: () => {
							resolve();
						},
						...params,
					}
				);
			});
		});

	const sendMessage = async (e) => {
		e.preventDefault();

		const msg = {
			message,
			sender_id: user.contactId,
		};

		if (files.length) {
			await uploadFiles(files, {
				onError: (error) => {
					console.error('File upload error:', error);
				},
			});

			msg.attached_ids = [...uploadedFiles.current];
			uploadedFiles.current = [];
		}

		sendWSMessage(JSON.stringify(msg));
		setMessage('');
		setFiles([]);
	};

	useEffect(() => {
		if (lastMessage && lastMessage !== lastMessageRef.current) {
			lastMessageRef.current = lastMessage;
			onMessageHandler(lastJsonMessage);
		}
	}, [lastMessage]);

	return (
		<form onSubmit={sendMessage}>
			<Stack gap={2}>
				{files.length ? (
					<Stack
						direction="row"
						gap={2}
						flexWrap="wrap"
					>
						{files.map((file, index) => {
							return (
								<Chip
									key={index}
									label={file.name}
									onDelete={() => deleteFile(index)}
								/>
							);
						})}
					</Stack>
				) : undefined}

				<TextField
					value={message}
					onChange={handleMessageChange}
					fullWidth
					placeholder={isClosed ? 'Ошибка соединения' : 'Сообщение'}
					autoFocus
					variant="filled"
					slotProps={{
						input: {
							startAdornment: (
								<IconButton
									color="textPrimary.default"
									onClick={() => inputRef.current?.click()}
								>
									<PaperClipIcon />
								</IconButton>
							),
							endAdornment: (
								<IconButton
									color="textPrimary.default"
									type="submit"
									disabled={
										(!message && !files.length) ||
										isClosed ||
										isConnecting
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

				<input
					ref={inputRef}
					type="file"
					multiple
					onChange={(e) => handleFiles(e.target.files)}
					style={{
						display: 'none',
					}}
				/>
			</Stack>
		</form>
	);
};

export default SendMessageForm;
