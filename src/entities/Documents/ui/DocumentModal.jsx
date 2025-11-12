import { Box, CircularProgress, Modal, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import useGetBlob from '../hooks/useGetBlob';
import DownloadDocumentButton from './DownloadDocumentButton';
import RenderFile from './RenderFile';

const boxStyle = {
	paddingBlock: 2,
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	maxWidth: 800,
	minHeight: 250,
	maxHeight: '100vh',
	display: 'flex',
	outline: 'none',
};

const style = {
	bgcolor: 'background.paper',
	boxShadow: 24,
	borderRadius: '8px',
	overflow: 'auto',
	flexGrow: 1,
	p: 2,
};

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
				<Box sx={boxStyle}>
					<Box
						sx={{
							...style,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
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
					</Box>
				</Box>
			</Modal>
		);
	}

	if (isFetching) {
		return (
			<Modal
				open={open}
				onClose={onClose}
			>
				<Box sx={boxStyle}>
					<Box
						sx={{
							...style,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<CircularProgress color="primary" />
					</Box>
				</Box>
			</Modal>
		);
	}

	return (
		<Modal
			open={open}
			onClose={onClose}
		>
			<Box sx={boxStyle}>
				<Stack
					sx={style}
					gap={2}
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
							{fileName}
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
			</Box>
		</Modal>
	);
};

export default DocumentModal;
