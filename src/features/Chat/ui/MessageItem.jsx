import { useEffect, useRef, useState } from 'react';
import { Button, Skeleton, Stack, Typography } from '@mui/material';
import { formatTimestampToShortDate } from 'shared/lib';
import { DocumentModal, useUploadedFiles } from 'entities/Documents';
import { formatFileName } from 'shared/lib/file';

const MESSAGE_TYPES = {
	USER: 'user',
	B24: 'b24',
	IMPORTANT: 'important',
};

const messageProps = (type, slotProps) => {
	switch (type) {
		case MESSAGE_TYPES.USER:
			return {
				slotProps: {
					primary: {
						typography: 'R20',
						color: 'primary.contrastText',
					},
					secondary: {
						typography: 'R16',
						color: 'textSecondary.secondary',
						textAlign: 'end',
					},
				},
				sx: {
					minWidth: '250px',
					maxWidth: '626px',
					backgroundColor: 'secondary.main',
					pl: 20,
					borderRadius: 4,
					borderBottomRightRadius: 0,
					paddingBlock: 1,
					paddingInline: 2,
					...slotProps?.listItemText,
				},
			};
		case MESSAGE_TYPES.B24:
			return {
				slotProps: {
					primary: {
						typography: 'R20',
						color: 'textPrimary.default',
					},
					secondary: {
						typography: 'R16',
						color: 'textSecondary.light',
						textAlign: 'end',
					},
				},
				sx: {
					minWidth: '250px',
					maxWidth: '626px',
					backgroundColor: 'background.bubble',
					borderRadius: 4,
					borderTopLeftRadius: 0,
					paddingBlock: 1,
					paddingInline: 2,
					...slotProps?.listItemText,
					pr: 20 + slotProps?.listItemText?.pr,
				},
			};
		case MESSAGE_TYPES.IMPORTANT:
			return {
				slotProps: {
					primary: {
						typography: 'R20',
						color: 'primary.contrastText',
					},
					secondary: {
						typography: 'R16',
						color: 'primary.lightText',
						textAlign: 'end',
					},
				},
				sx: {
					minWidth: '250px',
					maxWidth: '626px',
					backgroundColor: 'primary.main',
					borderRadius: 4,
					borderTopLeftRadius: 0,
					paddingBlock: 1,
					paddingInline: 2,
					...slotProps?.listItemText,
					pr: 20 + slotProps?.listItemText?.pr,
				},
			};
		default:
			return {};
	}
};

const FileItem = ({ file, onClick }) => {
	if (!file)
		return (
			<Typography
				variant="R16"
				backgroundColor="background.light"
				borderRadius={2}
				p={1}
				fontStyle="italic"
			>
				Файл удалён
			</Typography>
		);

	return (
		<Button
			onClick={onClick}
			sx={{
				typography: 'R16',
				backgroundColor: 'background.light',
				borderRadius: 2,
				p: 1,
				justifyContent: 'start',
				color: 'textPrimary.default',
			}}
		>
			{formatFileName(file.NAME)}
		</Button>
	);
};

export const MessageItem = ({
	message,
	onMessageVisible,
	slotProps,
	...props
}) => {
	const messageRef = useRef(null);
	const messageType = message.is_important
		? MESSAGE_TYPES.IMPORTANT
		: message.sender_type === 'user'
		? MESSAGE_TYPES.USER
		: MESSAGE_TYPES.B24;

	const fileQueries = useUploadedFiles(message.attached_ids);
	const [openedFile, setOpenedFile] = useState(null);

	useEffect(() => {
		const element = messageRef.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						onMessageVisible?.(message);
					}
				});
			},
			{
				rootMargin: '0px',
			}
		);

		observer.observe(element);

		return () => {
			observer.unobserve(element);
		};
	}, [message.id, message, onMessageVisible]);

	return (
		<div
			ref={messageRef}
			{...props}
		>
			<Stack
				alignItems={message.sender_type === 'user' ? 'end' : 'start'}
				pr={1}
				{...slotProps?.wrapper}
			>
				<Stack sx={messageProps(messageType, slotProps)?.sx}>
					<Typography
						{...messageProps(messageType, slotProps)?.slotProps
							.primary}
					>
						{message.content}
					</Typography>

					{!!message.attached_ids.length && (
						<Stack
							paddingBlock={1}
							gap={1}
						>
							{fileQueries.map(({ data: file, isLoading }, i) => {
								if (isLoading)
									return (
										<Skeleton
											key={i}
											height="35px"
											sx={{
												backgroundColor:
													'background.light',
											}}
										/>
									);

								return (
									<FileItem
										onClick={() => setOpenedFile(file)}
										file={file}
										key={file?.ID || i}
									/>
								);
							})}
						</Stack>
					)}

					<Typography
						{...messageProps(messageType, slotProps)?.slotProps
							.secondary}
					>
						{`${formatTimestampToShortDate(message.timestamp)}\n${
							message.read ? 'V' : 'O'
						}`}
					</Typography>
				</Stack>
			</Stack>

			<DocumentModal
				open={!!openedFile}
				onClose={() => setOpenedFile(null)}
				downloadUrl={openedFile?.DOWNLOAD_URL}
				fileName={openedFile?.NAME}
			/>
		</div>
	);
};
