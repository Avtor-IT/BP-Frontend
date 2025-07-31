import {
	Button,
	Card,
	CardHeader,
	CircularProgress,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import { useRef, useState } from 'react';
import { PaperClipIcon } from 'shared/icons/Paperclip';
import { useMaxWidth } from 'shared/model';
import { createAdditioinalSx } from 'shared/mui';
import { CircledTitle } from 'shared/ui/CircledTitle';
import { ScrollBox } from 'shared/ui/Scrollable';
import useUploadFileMutation from '../hooks/useUploadFileMutation';
import { CloseIcon } from 'shared/icons/Close';
import { useFiletoBase64 } from '../hooks/useFileToBase64';

const UploadDocument = (props) => {
	const breakpoints = useMaxWidth();

	const inputRef = useRef(null);
	const [droppedFiles, setDroppedFiles] = useState([]);
	const uploadMutation = useUploadFileMutation();
	const toBase64Mutation = useFiletoBase64();

	const handleFiles = (newFiles) => {
		if (!newFiles) return;

		setDroppedFiles((prev) => [...prev, ...Array.from(newFiles)]);
	};

	const removeHandle = (e, i) => {
		e.stopPropagation();

		const prev = [...droppedFiles];
		prev.splice(i, 1);
		setDroppedFiles(prev);
	};

	const [isLoading, setLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorDescribe, setErrorDescribe] = useState('');

	const uploadHandle = async () => {
		try {
			setLoading(true);
			setIsError(false);
			for (const rawFile of droppedFiles) {
				const preparedFile = {
					name: rawFile.name,
					base64: await toBase64Mutation.mutateAsync(rawFile),
				};

				await uploadMutation.mutateAsync(preparedFile);
			}
			setDroppedFiles([]);
		} catch (e) {
			setIsError(true);

			if (e.response.data.error === 'DISK_OBJ_22000') {
				setErrorDescribe('Файл с таким названием уже есть.');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card
			{...props}
			sx={createAdditioinalSx(
				{ paddingBottom: 0, justifyContent: 'space-between' },
				props.sx
			)}
		>
			<CardHeader
				action={
					!breakpoints.xxxl && (
						<Button
							onClick={uploadHandle}
							variant="unstyled"
							sx={{
								typography: 'M16',
								color: 'secondary.main',
							}}
							disabled={!droppedFiles.length || Boolean(isError)}
						>
							Добавить
						</Button>
					)
				}
				title={
					<CircledTitle
						color="secondary.main"
						title={
							<>
								Добавить
								<br /> новый документ
							</>
						}
					/>
				}
			/>
			<Stack
				flexGrow={1}
				justifyContent="center"
				alignItems="center"
				border={!droppedFiles.length ? '2px dashed' : undefined}
				borderColor="secondary.main"
				borderRadius={4}
				gap={2}
				maxHeight={breakpoints.xxxl ? 226 : 190}
				height={breakpoints.lg ? 82 : undefined}
				position="relative"
				cursor="pointer"
				onClick={() => inputRef.current?.click()}
				onDragOver={(e) => e.preventDefault()}
				onDrop={(e) => {
					e.preventDefault();
					handleFiles(e.dataTransfer.files);
				}}
			>
				{isLoading && (
					<Stack
						position="absolute"
						top={0}
						bottom={0}
						left={0}
						right={0}
						backgroundColor="#00000030"
						zIndex={2}
						justifyContent="center"
						alignItems="center"
						borderRadius={4}
					>
						<CircularProgress />
					</Stack>
				)}

				{isError && (
					<Stack
						position="absolute"
						top={0}
						bottom={0}
						left={0}
						right={0}
						backgroundColor="background.default"
						zIndex={2}
						justifyContent="center"
						alignItems="center"
						borderRadius={4}
						p={2}
					>
						<Typography
							color="error"
							variant="M20"
							textAlign="center"
						>
							{errorDescribe ||
								'Возникла ошибка. Сообщите менеджеру.'}
						</Typography>
						<Button
							onClick={() => setIsError(false)}
							sx={{ typography: 'M20' }}
							color={'secondary'}
						>
							Повторить попытку
						</Button>
					</Stack>
				)}

				<input
					disabled={isLoading || Boolean(isError)}
					ref={inputRef}
					type="file"
					multiple
					onChange={(e) => handleFiles(e.target.files)}
					style={{
						display: 'none',
					}}
				/>

				{droppedFiles.length ? (
					<Stack
						gap={2}
						flexGrow={1}
						width="100%"
						p={3}
					>
						<Typography
							variant="M16"
							color="textSecondary"
						>
							Загруженные файлы:
						</Typography>
						<Stack
							flexGrow={1}
							gap={1}
						>
							<ScrollBox>
								{droppedFiles.map((file, i) => (
									<Stack
										direction="row"
										gap={2}
										key={i}
									>
										<Typography
											variant="R16"
											sx={{
												paddingBlock: 1,
												paddingInline: 2,
												borderRadius: 2,
												border: '1px solid',
												borderColor: 'secondary.main',
												color: 'secondary.main',
												flexGrow: 1,
											}}
										>
											{file.name}
										</Typography>
										<IconButton
											onClick={(e) => removeHandle(e, i)}
										>
											<CloseIcon />
										</IconButton>
									</Stack>
								))}
							</ScrollBox>
						</Stack>
					</Stack>
				) : (
					<>
						{!breakpoints.xxl && (
							<Typography
								maxWidth={breakpoints.xxxl ? 170 : undefined}
								variant="R16"
							>
								Перетащите файлы или выберите на компьютере
							</Typography>
						)}
						<Button
							variant="unstyled"
							startIcon={<PaperClipIcon />}
							sx={{ typography: 'R20' }}
						>
							Выбрать файл
						</Button>
					</>
				)}
			</Stack>
		</Card>
	);
};

export default UploadDocument;
