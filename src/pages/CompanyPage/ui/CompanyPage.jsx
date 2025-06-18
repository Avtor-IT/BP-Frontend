import { Typography } from '@mui/material';
import { Grid, Stack } from '@mui/system';
import { BillCard, useBills } from 'entities/Bill';
import {
	DocumentsLink,
	DocumentsSlider,
	TaxExtractCard,
} from 'entities/Documents';
import { useMemo } from 'react';
import { useMaxWidth } from 'shared/model';
import { CompanyCard } from 'widgets/CompanyCard';
import { DocumentTemplateCard } from 'widgets/DocumentTemplate';

const CompanyPage = () => {
	const { data: bills, isLoading, isError } = useBills();
	const breakpoints = useMaxWidth();

	const billList = useMemo(() => {
		if (bills) return bills;
		return Array.from({ length: 4 });
	}, [bills]);

	const mockDocuments = [
		{ title: 'Справка №1' },
		{ title: 'Справка №2' },
		{ title: 'Справка №3' },
		{ title: 'Справка №4' },
	];

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
				<Grid
					container
					size={{ xxxl: 4, lg: 3, xs: 5 }}
					columns={{ xxxl: 4, xs: 3 }}
					spacing={2}
					sx={{
						minHeight:
							breakpoints.xxxl && !breakpoints.lg ? 900 : 'none',
					}}
				>
					<Grid
						size={{ xxxl: 2, xs: 3 }}
						sx={{ minHeight: breakpoints.lg ? 181 : 192 }}
					>
						<CompanyCard
							sx={{ height: '100%' }}
							documents={false}
						/>
					</Grid>

					{!breakpoints.xxxl ? (
						<Grid size={2}>
							<TaxExtractCard sx={{ height: '100%' }} />
						</Grid>
					) : null}

					<Grid size={{ xxxl: 2, xs: 3 }}>
						{breakpoints.lg ? (
							<DocumentsLink title={'Перейти в мои документы'} />
						) : (
							<DocumentsSlider
								title="Мои документы"
								documents={mockDocuments}
								sx={{ minHeight: 337 }}
							/>
						)}
					</Grid>
					<Grid size={{ xxxl: 2, xs: 3 }}>
						{breakpoints.lg ? (
							<DocumentsLink
								title={'Перейти в рабочие документы'}
							/>
						) : (
							<DocumentsSlider
								title="Рабочие документы"
								documents={mockDocuments}
								sx={{ minHeight: 337 }}
							/>
						)}
					</Grid>
				</Grid>

				<Grid
					size={{ xxxl: 1, lg: 2, xs: 5 }}
					sx={{ minHeight: breakpoints.xxxl ? 'none' : 545 }}
				>
					<Stack
						gap={2}
						height="100%"
					>
						<DocumentTemplateCard sx={{ flexGrow: 1 }} />

						{breakpoints.xxxl ? (
							<TaxExtractCard
								sx={{ height: breakpoints.lg ? 'auto' : 337 }}
							/>
						) : null}
					</Stack>
				</Grid>
			</Grid>

			{/* bills */}
			{!isError ? (
				<Grid
					container
					columns={5}
					rowSpacing={2}
				>
					{billList.map((bill, i) => (
						<Grid
							size={{ xxxl: 4, xs: 5 }}
							key={i}
						>
							<BillCard
								loading={isLoading}
								bill={bill}
								key={i}
							/>
						</Grid>
					))}
				</Grid>
			) : (
				<Typography variant="h5">
					Ошибка при загрузке счетов.
				</Typography>
			)}
		</Stack>
	);
};

export default CompanyPage;
