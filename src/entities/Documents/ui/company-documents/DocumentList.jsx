import { Button, CircularProgress, Input, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AppRoutes, RoutePath } from 'shared/router';
import { Card } from 'shared/ui/Card';
import useCompanyDocuments from '../../hooks/useCompanyDocuments';
import useDocumentsFilterStore from '../../model/documentsFilterStore';
import FilesList from './file/FilesList';
import Folder from './folder/Folder';
import { useMaxWidth } from 'shared/model';

const DocumentList = ({ company, ...otherProps }) => {
	const breakpoints = useMaxWidth();
	const { companyTitle, '*': urlPath } = useParams();
	const navigate = useNavigate();
	const { data: documents, isLoading, error } = useCompanyDocuments();
	const { search } = useDocumentsFilterStore.use.filters();
	const setSearch = useDocumentsFilterStore.use.setSearch();

	const foldersList = useMemo(() => {
		if (!documents) return [];
		return documents.filter((doc) => doc['TYPE'] === 'folder');
	}, [documents]);

	const pathArray = useMemo(() => {
		if (urlPath) {
			return urlPath.split('/');
		}
		return [];
	}, [urlPath]);

	useEffect(() => {
		if (foldersList && pathArray) {
			const folder = pathArray[0];
			if (!foldersList.map((folder) => folder.NAME).includes(folder)) {
				navigate(
					`${RoutePath[AppRoutes.COMPANY]}/${companyTitle}/documents`,
					{ replace: true }
				);
			}
		}
	}, [foldersList, pathArray]);

	// @TODO: Система поиска поменяется
	const filteredDocuments = useMemo(() => {
		if (!documents) return [];
		const files = documents.filter((doc) => doc['TYPE'] === 'file');
		if (search) {
			return files.filter((doc) =>
				doc['NAME'].toLowerCase().includes(search.toLowerCase())
			);
		}
		return files;
	}, [documents, search]);

	if (!company) {
		return (
			<Box {...otherProps}>
				<Typography variant="M24">Компания не выбрана</Typography>
			</Box>
		);
	}

	if (isLoading) {
		return (
			<Stack
				alignItems="center"
				{...otherProps}
			>
				<CircularProgress />
			</Stack>
		);
	}

	if (error) {
		return (
			<Box {...otherProps}>
				<Typography variant="M20">
					Ошибка загрузки документов.
				</Typography>
			</Box>
		);
	}

	if (!documents.length) {
		return (
			<Box {...otherProps}>
				<Typography variant="M20">Документы не найдены.</Typography>
			</Box>
		);
	}

	return (
		<Stack
			gap={4}
			{...otherProps}
		>
			<Stack
				direction={breakpoints.md ? 'column' : 'row'}
				gap={2}
			>
				<Button
					color="secondary"
					variant="contained"
					sx={{
						borderRadius: 2,
						typography: 'M20',
						p: 2,
						flexGrow: breakpoints.lg ? 1 : undefined,
					}}
				>
					Моя компания
				</Button>
				<Button
					color="secondary"
					variant="outlined"
					sx={{
						borderRadius: 2,
						typography: 'M20',
						p: 2,
						flexGrow: breakpoints.lg ? 1 : undefined,
					}}
				>
					Рабочие документы
				</Button>
			</Stack>

			{/* <Input
				inputProps={{ placeholder: 'Поиск' }}
				variant="card"
				mb={4}
				onInput={(e) => setSearch(e.target.value)}
				fullWidth
			/> */}

			<Stack
				gap={2}
				paddingBottom={2}
			>
				{foldersList.map((folder) => (
					<Folder
						key={folder.ID}
						folder={folder}
						open={pathArray[0] === folder['NAME']}
					/>
				))}

				{filteredDocuments.length ? (
					<Card
						minHeight={76}
						variant="no-shadow"
						sx={{ padding: '0 !important' }}
					>
						<FilesList files={filteredDocuments} />
					</Card>
				) : null}
			</Stack>
		</Stack>
	);
};

export default DocumentList;
