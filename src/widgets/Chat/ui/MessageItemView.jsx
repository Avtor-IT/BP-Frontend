import { Button, Skeleton, Stack, Typography } from '@mui/material';
import { DocumentModal } from 'entities/Documents';
import { formatTimestampToShortDate } from 'shared/lib';
import { formatFileName } from 'shared/lib/file';
import { MESSAGE_TYPES } from '../model/useMessageItem';

const getMessageProps = (type, slotProps) => {
	const rightPadding = slotProps?.listItemText?.pr ?? 0;

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
					pr: 20 + rightPadding + 'px',
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
					pr: 20 + rightPadding + 'px',
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

export const MessageItemView = ({
	message,
	messageType,
	messageRef,
	slotProps,
	fileQueries,
	openedFile,
	onFileOpen,
	onModalClose,
	...props
}) => {
	const messageProps = getMessageProps(messageType, slotProps);
	const attachedIds = message.attached_ids ?? [];

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
				<Stack sx={messageProps?.sx}>
					<Typography {...messageProps?.slotProps?.primary}>
						{message.content}
					</Typography>

					{!!attachedIds.length && (
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
											variant="rounded"
											sx={{
												backgroundColor:
													'background.light',
												borderRadius: 2,
											}}
										/>
									);

								return (
									<FileItem
										onClick={() => onFileOpen(file)}
										file={file}
										key={file?.ID || i}
									/>
								);
							})}
						</Stack>
					)}

					<Typography {...messageProps?.slotProps?.secondary}>
						{`${formatTimestampToShortDate(message.timestamp)}\n${
							message.read ? 'V' : 'O'
						}`}
					</Typography>
				</Stack>
			</Stack>

			<DocumentModal
				open={!!openedFile}
				onClose={onModalClose}
				downloadUrl={openedFile?.DOWNLOAD_URL}
				fileName={openedFile?.NAME}
			/>
		</div>
	);
};
