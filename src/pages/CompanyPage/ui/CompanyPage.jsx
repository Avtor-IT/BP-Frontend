import { Grid, Stack, useMediaQuery, useTheme } from '@mui/system';
import { DocumentsWidget, TaxExtractCard } from 'entities/Documents';
import { CompanyCard } from 'widgets/CompanyCard';
import { DocumentTemplateCard } from 'widgets/DocumentTemplate';
import { useBills } from 'entities/Bill';
import { Fragment, useMemo } from 'react';
import { BillCard, BillActionCard } from 'entities/Bill';
import { Typography } from '@mui/material';
import { BillCardMobile } from 'entities/Bill';

const CompanyPage = () => {
	const theme = useTheme();
	const upXxxl = useMediaQuery(theme.breakpoints.up('xxxl'));
	const downXxl = useMediaQuery(theme.breakpoints.down('xxl'));
	const { data: bills, isLoading, isError } = useBills();

	const billList = useMemo(() => {
		if (bills) return bills;
		return Array.from({ length: 4 });
	}, [bills]);

	const mock_documents = [
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
					size={{ xxxl: 4, xs: 3 }}
					columns={{ xxxl: 4, xs: 3 }}
					spacing={2}
					sx={{ minHeight: upXxxl ? 'none' : 900 }}
				>
					<Grid
						size={{ xxxl: 2, xs: 3 }}
						sx={{ minHeight: 192 }}
					>
						<CompanyCard
							sx={{ height: '100%' }}
							documents={false}
						/>
					</Grid>

					{upXxxl && (
						<Grid size={{ xxxl: 2, xs: 3 }}>
							<TaxExtractCard sx={{ height: '100%' }} />
						</Grid>
					)}

					<Grid size={{ xxxl: 2, xs: 3 }}>
						<DocumentsWidget
							title="Мои документы"
							documents={mock_documents}
							sx={{ minHeight: 337 }}
						/>
					</Grid>
					<Grid size={{ xxxl: 2, xs: 3 }}>
						<DocumentsWidget
							title="Рабочие документы"
							documents={mock_documents}
							sx={{ minHeight: 337 }}
						/>
					</Grid>
				</Grid>

				<Grid
					size={{ xxxl: 1, xs: 2 }}
					sx={{ minHeight: upXxxl ? 545 : 'none' }}
				>
					<Stack
						gap={2}
						height="100%"
					>
						<DocumentTemplateCard sx={{ flexGrow: 1 }} />

						{!upXxxl && <TaxExtractCard sx={{ height: 337 }} />}
					</Stack>
				</Grid>
			</Grid>

			{/* bills */}
			{!isError ? (
				<Grid
					container
					columns={5}
				>
					<Grid
						container
						size={{ xxxl: 4, xs: 5 }}
						columns={{ xxxl: 4, xs: 5 }}
						spacing={2}
					>
						{billList.map((bill, i) =>
							downXxl ? (
								<Grid
									size={5}
									key={i}
								>
									<BillCardMobile
										bill={bill}
										loading={isLoading}
									/>
								</Grid>
							) : (
								<Fragment key={i}>
									<Grid size={{ xxxl: 3, xs: 4 }}>
										<BillCard
											sx={{ height: '100%' }}
											bill={bill}
											loading={isLoading}
										/>
									</Grid>
									<Grid size={1}>
										<BillActionCard
											sx={{ height: '100%' }}
											bill={bill}
											loading={isLoading}
										/>
									</Grid>
								</Fragment>
							)
						)}
					</Grid>
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
