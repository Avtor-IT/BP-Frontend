import { CircularProgress, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import useGetBlob from '../hooks/useGetBlob';
import DownloadDocumentButton from './DownloadDocumentButton';
import { RenderFile } from 'shared/ui/RenderFile';
import { formatFileName } from 'shared/lib/file';
import { Modal } from 'shared/ui/Modal';

const DocumentModal = ({ open, onClose, downloadUrl, fileName }) => {
	const { data: blob, isError } = useGetBlob(downloadUrl);
	const [content, setContent] = useState(null);
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		if (blob) {
			const blobType = blob.type.split(';')[0];
			const reader = new FileReader();
			reader.onload = () => {
				setContent(reader.result);
				setIsFetching(false);
			};

			if (blobType === 'text/plain') {
				reader.readAsText(blob);
			} else if (
				blobType.startsWith('image/') ||
				blobType === 'application/pdf'
			) {
				reader.readAsDataURL(blob);
			} else {
				// Неподдерживаемый формат
				setIsFetching(false);
			}
		}
	}, [blob]);

	if (isError || !downloadUrl) {
		return (
			<Modal
				open={open}
				onClose={onClose}
			>
				<Typography
					variant="M24"
					maxWidth="calc(100% - 2rem)"
					overflow="hidden"
					textOverflow="ellipsis"
				>
					{!downloadUrl
						? 'Файл отсутствует на севрере.'
						: 'Произошла ошибка при загрузке документа.'}
				</Typography>
			</Modal>
		);
	}

	if (isFetching) {
		return (
			<Modal
				open={open}
				onClose={onClose}
			>
				<Stack
					width="100%"
					flexGrow={1}
					justifyContent="center"
					alignItems="center"
				>
					<CircularProgress color="primary" />
				</Stack>
			</Modal>
		);
	}

	return (
		<Modal
			open={open}
			onClose={onClose}
		>
			<Stack
				gap={2}
				alignItems="start"
				justifyContent="start"
			>
				<Stack
					direction="row"
					gap={1}
					alignItems="center"
				>
					<Typography
						variant="M24"
						maxWidth="calc(100% - 2rem)"
						overflow="hidden"
						textOverflow="ellipsis"
					>
						{formatFileName(fileName)}
					</Typography>

					<DownloadDocumentButton
						downloadUrl={downloadUrl}
						fileName={fileName}
						style={{ height: '1rem' }}
					/>
				</Stack>

				<Stack
					flexGrow={1}
					justifyContent="center"
					alignItems="center"
				>
					<RenderFile
						content={content}
						type={blob.type.split(';')[0]}
					/>
				</Stack>
			</Stack>
		</Modal>
	);
};

export default DocumentModal;
