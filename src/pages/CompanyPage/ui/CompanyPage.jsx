import { Grid, Stack } from '@mui/system';
import { BillList } from 'entities/Bill';
import { TaxExtractCard } from 'entities/Documents';
import { CompanyCard } from 'widgets/CompanyCard';
import { MyDocumentsCard, WorkingDocumentsCard } from 'widgets/DocumentsCard';
import { DocumentTemplateCard } from 'widgets/DocumentTemplate';

const CompanyPage = () => {
	return (
		<Stack
			alignItems="stretch"
			justifyContent="start"
			gap={9}
			paddingBottom={2}
		>
			<Grid
				container
				columns={5}
				spacing={2}
			>
				<Grid size={4}>
					<Stack gap={2}>
						<Grid
							minHeight="192px"
							container
							columns={2}
							spacing={2}
						>
							<Grid size={1}>
								<CompanyCard
									sx={{ height: '100%' }}
									documents={false}
								/>
							</Grid>
							<Grid size={1}>
								<TaxExtractCard sx={{ height: '100%' }} />
							</Grid>
						</Grid>
						<Grid
							minHeight="337px"
							container
							columns={2}
							spacing={2}
							flexGrow={1}
						>
							<Grid size={1}>
								<MyDocumentsCard
									sx={{ height: '100%' }}
									companyTitle="Вторая тестовая компания"
								/>
							</Grid>
							<Grid size={1}>
								<WorkingDocumentsCard
									sx={{ height: '100%' }}
									companyTitle="Вторая тестовая компания"
								/>
							</Grid>
						</Grid>
					</Stack>
				</Grid>
				<Grid size={1}>
					<DocumentTemplateCard sx={{ height: '100%' }} />
				</Grid>
			</Grid>

			<Grid
				container
				columns={5}
			>
				<Grid size={4}>
					<BillList />
				</Grid>
			</Grid>
		</Stack>
	);
};

export default CompanyPage;
