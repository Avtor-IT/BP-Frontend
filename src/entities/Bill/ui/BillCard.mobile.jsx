import {
	Card,
	CardContent,
	CardHeader,
	Skeleton,
	Stack,
	Typography,
} from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/system';
import BillDocuments from './BillDocuments.jsx';
import { statusColor, statusName } from '../model/billStatus';
import { BillActionCard } from 'entities/Bill/index.js';

const BillCardMobile = ({ bill, loading, ...props }) => {
	const theme = useTheme();
	const downXl = useMediaQuery(theme.breakpoints.down('xl'));

	if (loading) {
		return (
			<Skeleton
				height={388}
				{...props}
			/>
		);
	}

	return (
		<Card
			{...props}
			sx={{ color: 'textPrimary.default', ...props.sx }}
		>
			<CardHeader
				title={bill.serviceName}
				action={
					<Typography
						variant="M20"
						color="tertiary.main"
					>
						{bill.category}
					</Typography>
				}
				sx={{ paddingBottom: 0 }}
			/>

			<CardContent>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="stretch"
					height="100%"
					gap={3}
				>
					<Stack
						flexGrow={1.5}
						gap={2}
						justifyContent="space-between"
					>
						<Stack gap={2}>
							<Stack
								direction="row"
								justifyContent="space-between"
							>
								<Typography variant="M20">
									Сумма к оплате:
								</Typography>
								<Typography variant="M20">
									{bill.sum}
								</Typography>
							</Stack>

							<Stack
								direction="row"
								justifyContent="space-between"
							>
								<Typography variant="M20">Дата:</Typography>
								<Typography variant="M20">
									{bill.date}
								</Typography>
							</Stack>
						</Stack>

						<Stack
							direction="row"
							justifyContent="space-between"
						>
							<Typography variant="M20">Статус:</Typography>
							<Typography
								variant="M24"
								color={statusColor[bill.status]}
							>
								{statusName[bill.status]}
							</Typography>
						</Stack>
					</Stack>

					<Stack
						height="100%"
						gap={1}
						justifyContent="end"
						flexGrow={downXl ? 0 : 1}
						width={downXl ? '300px' : 'auto'}
					>
						<BillDocuments bill={bill} />
					</Stack>
				</Stack>

				<BillActionCard
					bill={bill}
					loading={loading}
					sx={{ marginTop: 2 }}
				/>
			</CardContent>
		</Card>
	);
};

export default BillCardMobile;
