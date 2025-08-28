import {
	Box,
	Button,
	Input,
	MenuItem,
	Select,
	Typography,
} from '@mui/material';
import { Grid, Stack } from '@mui/system';
import { BillCard, useBills } from 'entities/Bill';
import { CompanyCard, useCompanies } from 'entities/Company';
import {
	DocumentsLink,
	DocumentsSlider,
	TaxExtractCard,
} from 'entities/Documents';
import { LetterheadCard } from 'entities/Letter';
import { useMemo } from 'react';
import { ArrowIconDown } from 'shared/icons/Arrow';
import { UpDownIcon } from 'shared/icons/UpDown';
import { useMaxWidth } from 'shared/model';
import { RoutePath, AppRoutes } from 'shared/router';

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

	const {
		data: companies,
		isError: _isCompanuesError,
		isLoading: _isCompaniesLoading,
	} = useCompanies();

	const selectedCompany = useMemo(() => {
		if (companies) {
			return companies[0];
		}
	}, [companies]);

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

					{!breakpoints.xxxl && (
						<Grid size={2}>
							<TaxExtractCard sx={{ height: '100%' }} />
						</Grid>
					)}

					<Grid size={{ xxxl: 2, xs: 3 }}>
						{breakpoints.lg ? (
							<DocumentsLink title={'Перейти в мои документы'} />
						) : (
							<DocumentsSlider
								title="Мои документы"
								documents={mockDocuments}
								sx={{ minHeight: 337 }}
								linkTo={`${RoutePath[AppRoutes.COMPANY]}/${
									selectedCompany?.['TITLE']
								}/documents`}
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
								linkTo={`${RoutePath[AppRoutes.COMPANY]}/${
									selectedCompany?.['TITLE']
								}/documents`}
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
						<LetterheadCard sx={{ flexGrow: 1 }} />
						{breakpoints.xxxl && (
							<TaxExtractCard
								sx={{ height: breakpoints.lg ? 'auto' : 337 }}
							/>
						)}
					</Stack>
				</Grid>
			</Grid>

			{/* bills */}
			{!isError ? (
				<Stack gap={{ xl: 4, xs: 3 }}>
					<Typography variant={breakpoints.xl ? 'M24' : 'M40'}>
						Счета
					</Typography>

					<Input
						placeholder="Поиск"
						fullWidth
						sx={{
							p: breakpoints.xl ? 1 : undefined,
							typography: breakpoints.xl ? 'R16' : 'R20',
							borderRadius: breakpoints.xl ? 2 : undefined,
						}}
						variant="card"
					/>

					{breakpoints.lg ? (
						<Box>
							<Button
								variant="card"
								sx={{
									borderRadius: '8px',
									color: 'tertiary.dark',
									gap: 1,
									paddingBlock: breakpoints.xl
										? '10px'
										: undefined,
									width: 'auto',
									typography: 'M16',
								}}
								endIcon={<ArrowIconDown />}
							>
								Фильтры
							</Button>
						</Box>
					) : (
						<Stack
							direction="row"
							gap={1}
						>
							<Button
								variant="card"
								sx={{
									borderRadius: '8px',
									color: 'tertiary.dark',
									gap: 1,
									paddingBlock: breakpoints.xl
										? '10px'
										: undefined,
								}}
								endIcon={<UpDownIcon sx={{ strokeWidth: 2 }} />}
							>
								Дата
							</Button>

							<Select
								label="По месяцам"
								variant="filled"
								value="all"
								sx={{
									typography: breakpoints.xl ? 'M16' : 'M20',
									'& .MuiSelect-select': {
										paddingBlock: breakpoints.xl
											? '10px'
											: undefined,
									},
								}}
							>
								<MenuItem value="all">По неделям</MenuItem>
								<MenuItem value="formed">По годам</MenuItem>
							</Select>

							<Select
								label="Состояние"
								variant="filled"
								value="all"
								sx={{
									typography: breakpoints.xl ? 'M16' : 'M20',
									'& .MuiSelect-select': {
										paddingBlock: breakpoints.xl
											? '10px'
											: undefined,
									},
								}}
							>
								<MenuItem value="all">Состояние</MenuItem>
								<MenuItem value="formed">Сформировано</MenuItem>
								<MenuItem value="draft">Черновик</MenuItem>
								<MenuItem value="sent">Отправлено</MenuItem>
							</Select>
						</Stack>
					)}

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
				</Stack>
			) : (
				<Typography variant="h5">
					Ошибка при загрузке счетов.
				</Typography>
			)}
		</Stack>
	);
};

export default CompanyPage;
