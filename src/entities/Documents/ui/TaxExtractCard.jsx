import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import ImportIcon from 'shared/icons/Import';
import { useMaxWidth } from 'shared/model';
import { CircledTitle } from 'shared/ui/CircledTitle';
import TaxRefreshButton from './TaxRefreshButton';

const TaxExtractCard = ({ ...props }) => {
	const breakpoints = useMaxWidth();

	return (
		<Card
			{...props}
			sx={{
				gap: breakpoints.xl ? (breakpoints.lg ? 0 : 2) : 3,
				paddingBlock: breakpoints.lg ? 2 : undefined,
				...props.sx,
			}}
		>
			<CardHeader
				title={
					<CircledTitle
						title="Выписка с налоговой"
						color="primary.light"
					/>
				}
				sx={{
					alignItems: 'start',
					paddingInline: breakpoints.lg ? 2 : undefined,
				}}
				action={!breakpoints.xxl ? <TaxRefreshButton /> : null}
				slotProps={{
					title: {
						variant: breakpoints.lg ? 'M20' : 'M24',
					},
				}}
			/>

			<CardContent
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					flexGrow: 1,
				}}
			>
				{breakpoints.xxl && !breakpoints.lg && <TaxRefreshButton />}

				<Stack
					sx={{ marginTop: 'auto' }}
					direction="row"
					justifyContent="space-between"
					alignItems="end"
				>
					<Stack
						direction="row"
						alignItems="center"
						gap={2}
					>
						<Stack
							color="tertiary.main"
							gap={breakpoints.xxxl ? 0.5 : 1}
						>
							<Typography
								variant={
									breakpoints.xxl
										? breakpoints.xl && !breakpoints.lg
											? 'M12'
											: 'M16'
										: 'R20'
								}
								whiteSpace={
									breakpoints.xxl ? 'normal' : 'nowrap'
								}
								color={
									breakpoints.lg ? 'textPrimary' : undefined
								}
							>
								{breakpoints.lg
									? 'Обновлено'
									: 'Последнее обновление'}
							</Typography>
							<Typography
								color={
									breakpoints.xl && !breakpoints.lg
										? 'secondary.main'
										: undefined
								}
								variant={
									breakpoints.xxl
										? breakpoints.xl
											? breakpoints.lg
												? 'M12'
												: 'R12'
											: 'R16'
										: 'M16'
								}
							>
								29.08.2024 в 10:00
							</Typography>
						</Stack>

						{breakpoints.lg && <TaxRefreshButton />}
					</Stack>

					<Stack
						direction={breakpoints.xxxl ? 'column' : 'row'}
						alignItems={breakpoints.xxxl ? 'end' : 'center'}
						gap={breakpoints.xxxl ? 0.5 : 1}
					>
						{!breakpoints.lg ? (
							<Typography
								textAlign="end"
								variant={breakpoints.xl ? 'M12' : 'M16'}
								color="secondary"
							>
								Выписка за 29.08.2024
							</Typography>
						) : null}

						<Stack
							direction="row"
							gap={1}
						>
							<ImportIcon
								strokeWidth={1.5}
								color="tertiary"
							/>
						</Stack>
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	);
};
export default TaxExtractCard;
