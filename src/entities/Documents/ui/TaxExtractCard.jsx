import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Typography,
} from '@mui/material';
import { Stack, useMediaQuery, useTheme } from '@mui/system';
import ExportIcon from 'shared/icons/Export';
import ImportIcon from 'shared/icons/Import';
import { RefreshIcon } from 'shared/icons/Refresh';
import { CircledTitle } from 'shared/ui/CircledTitle';

const TaxExtractCard = ({ ...props }) => {
	const theme = useTheme();
	const downXxxl = useMediaQuery(theme.breakpoints.down('xxxl'));
	const downXxl = useMediaQuery(theme.breakpoints.down('xxl'));
	const downXl = useMediaQuery(theme.breakpoints.down('xl'));

	return (
		<Card
			{...props}
			sx={{ gap: downXl ? 2 : 3, ...props.sx }}
		>
			<CardHeader
				title={
					<CircledTitle
						title="Выписка с налоговой"
						color="primary.light"
					/>
				}
				sx={{ alignItems: 'start' }}
				action={
					!downXxl && (
						<Button
							variant="unstyled"
							sx={{
								maxWidth: downXxxl ? 105 : 'auto',
								display: 'flex',
								flexDirection: downXxxl
									? 'column-reverse'
									: 'row',
								alignItems: downXxxl ? 'end' : 'center',
								gap: 1,
								color: 'tertiary.main',
							}}
						>
							<Typography
								variant="M16"
								textAlign="end"
							>
								Запрос на обновление
							</Typography>
							<RefreshIcon />
						</Button>
					)
				}
			/>

			<CardContent
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					flexGrow: 1,
				}}
			>
				{downXxl && (
					<Button
						variant="unstyled"
						sx={{
							maxWidth: '50%',
							display: 'flex',
							flexDirection: downXl ? 'column' : 'row',
							alignItems: downXl ? 'start' : 'end',
							justifyContent: 'start',
							gap: 1,
							color: downXl ? 'primary.main' : 'tertiary.main',
							'& .MuiButton-endIcon': { marginLeft: 0 },
						}}
						endIcon={
							<Box sx={{ p: downXl ? 0 : 0.5 }}>
								<RefreshIcon />
							</Box>
						}
					>
						<Typography
							variant="M16"
							maxWidth="105px"
						>
							Запрос на обновление
						</Typography>
					</Button>
				)}
				<Stack
					sx={{ marginTop: 'auto' }}
					direction="row"
					justifyContent="space-between"
					alignItems="end"
				>
					<Stack
						color="tertiary.main"
						gap={downXxxl ? 0.5 : 1}
					>
						<Typography
							variant={downXxl ? (downXl ? 'M12' : 'M16') : 'R20'}
							whiteSpace={downXxl ? 'normal' : 'nowrap'}
						>
							Последнее обновление
						</Typography>
						<Typography
							color={downXl ? 'secondary.main' : undefined}
							variant={downXxl ? (downXl ? 'R12' : 'R16') : 'M16'}
						>
							29.08.2024 в 10:00
						</Typography>
					</Stack>

					<Stack
						direction={downXxxl ? 'column' : 'row'}
						alignItems={downXxxl ? 'end' : 'center'}
						gap={downXxxl ? 0.5 : 1}
					>
						<Typography
							textAlign="end"
							variant={downXl ? 'M12' : 'M16'}
							color="secondary"
						>
							Выписка за 29.08.2024
						</Typography>
						<Stack
							direction="row"
							gap={1}
						>
							<ExportIcon />
							<ImportIcon />
						</Stack>
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	);
};
export default TaxExtractCard;
