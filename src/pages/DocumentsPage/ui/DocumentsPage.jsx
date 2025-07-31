import { Box, Grid } from '@mui/material';
import { CompanyDocuments, UploadDocument } from 'entities/Documents';
// eslint-disable-next-line no-restricted-imports
import LoadDocs from 'entities/Documents/@X/Service/LoadDocs';
import { useMaxWidth } from 'shared/model';

const DocumentsPage = () => {
	const breakpoints = useMaxWidth();

	return (
		<Box>
			<Grid
				container
				columns={{ xl: 3, lg: 5, xs: 3 }}
				spacing={2}
			>
				{!breakpoints.xxxl && (
					<Grid
						size={1}
						minHeight={332}
					>
						<LoadDocs
							query={() => ({
								data: undefined,
								isLoading: false,
								isError: false,
							})}
							cardTitle="Документы на ЭЦП"
							renderDocs={() => 'Документов нет'}
						/>
					</Grid>
				)}
				{!breakpoints.xxxl && (
					<Grid
						size={1}
						minHeight={332}
					>
						<LoadDocs
							query={() => ({
								data: undefined,
								isLoading: false,
								isError: false,
							})}
							cardTitle="Документы на утверждение"
							renderDocs={() => 'Документов нет'}
						/>
					</Grid>
				)}

				{breakpoints.xxxl && (
					<Grid
						size={{ xl: 2, xs: 3 }}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
						}}
					>
						<LoadDocs
							query={() => ({
								data: undefined,
								isLoading: false,
								isError: false,
							})}
							cardTitle="Документы на ЭЦП"
							sx={{ minHeight: breakpoints.xxl ? 115 : 231 }}
							renderDocs={() => 'Документов нет'}
						/>
						<LoadDocs
							query={() => ({
								data: undefined,
								isLoading: false,
								isError: false,
							})}
							sx={{ minHeight: breakpoints.xxl ? 115 : 231 }}
							cardTitle="Документы на утверждение"
							renderDocs={() => 'Документов нет'}
						/>
					</Grid>
				)}
				<Grid size={{ xl: 1, lg: 2, xs: 3 }}>
					<UploadDocument sx={{ height: '100%' }} />
				</Grid>
			</Grid>

			<CompanyDocuments marginTop={4} />
		</Box>
	);
};

export default DocumentsPage;
