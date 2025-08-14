import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Skeleton,
	Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useCompanies } from 'entities/Company';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/router';
import { CopyBtn } from 'shared/ui/Button';
import { Circle, ErrorCard } from 'shared/ui/Card';
import CompanyBalanceCard from './CompanyBalanceCard';
import { CircledTitle } from 'shared/ui/CircledTitle';
import { createAdditioinalSx } from 'shared/mui';
import { useMaxWidth } from 'shared/model';

export const CompanyCard = ({ documents = true, ...props }) => {
	const breakpoints = useMaxWidth();
	const { data: companies, isError, isLoading } = useCompanies();

	const selectedCompany = useMemo(() => {
		if (companies) {
			return companies[0];
		}
	}, [companies]);

	if (isLoading) {
		return (
			<Skeleton
				variant="rounded"
				{...props}
			/>
		);
	}

	if (isError || !selectedCompany) {
		return (
			<ErrorCard
				text={`Ошибка при загрузке компании`}
				{...props}
			/>
		);
	}

	return (
		<Card
			{...props}
			sx={createAdditioinalSx(
				{
					position: 'relative',
					paddingTop: breakpoints.xl ? 3 : undefined,
				},
				props.sx
			)}
		>
			<CardHeader
				title={
					<CircledTitle
						title={selectedCompany?.['TITLE']}
						color="primary.main"
						fullWidth={breakpoints.lg}
						slotProps={{
							content: {
								sx: breakpoints.xl
									? { width: 158, display: 'inline-block' }
									: {
											width: 184,
											display: 'inline-block',
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
									  },
							},
							circle: {
								sx: {
									bottom: breakpoints.lg ? 10 : 0,
								},
							},
						}}
					/>
				}
			/>

			<CardContent
				sx={{
					height: '100%',
					display: 'flex',
					alignItems: 'stretch',
					justifyContent: 'space-between',
				}}
			>
				{documents ? (
					<Stack
						alignItems="end"
						justifyContent="end"
					>
						<Typography
							variant="R20"
							sx={{
								zIndex: '1',
								position: 'relative',
								display: 'flex',
								justifyContent: 'end',
								alignContent: 'end',
							}}
							component={Link}
							to={`${RoutePath[AppRoutes.COMPANY]}/${
								selectedCompany?.['TITLE']
							}/documents`}
							state={{ company: selectedCompany }}
						>
							<Circle
								sx={{
									backgroundColor: 'secondary.main',
									left: '-155%',
									right: '-150%',
									width: 'auto',
									top: '-100%',
									bottom: '-50%',
									zIndex: 1,
								}}
							/>
							<Box
								component="span"
								sx={{
									zIndex: 2,
									position: 'relative',
									color: '#FFF',
								}}
							>
								Мои документы
							</Box>
						</Typography>
					</Stack>
				) : (
					<Stack
						gap="4px"
						justifyContent="end"
						flexGrow={1}
					>
						{/* INN */}
						<CopyBtn textToCopy="0276142588">
							<Stack
								direction="row"
								gap={1}
								alignItems="center"
								color="var(--tertiary)"
								{...props}
							>
								<Typography variant="R20">ИНН:</Typography>
								<Typography variant="R16">
									0276142588
								</Typography>
							</Stack>
						</CopyBtn>

						{/* KPP */}
						<CopyBtn textToCopy="12345678">
							<Stack
								direction="row"
								gap={1}
								alignItems="center"
								color="var(--tertiary)"
								{...props}
							>
								<Typography variant="R20">КПП:</Typography>
								<Typography variant="R16">12345678</Typography>
							</Stack>
						</CopyBtn>
					</Stack>
				)}

				{!breakpoints.lg && (
					<CompanyBalanceCard
						sx={{
							position: 'absolute',
							top: breakpoints.xl ? 24 : 32,
							right: 24,
							bottom: 16,
							zIndex: 999,
						}}
					/>
				)}
			</CardContent>
		</Card>
	);
};
