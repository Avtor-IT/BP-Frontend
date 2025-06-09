import {
	Card,
	CardContent,
	CardHeader,
	Skeleton,
	Stack,
	Typography,
} from '@mui/material';
import BillDocuments from './BillDocuments';
import { statusColor, statusName } from '../model/billStatus';

const BillCard = ({ bill, loading, ...props }) => {
	if (loading) {
		return (
			<Skeleton
				height={248}
				variant="rounded"
				{...props}
			/>
		);
	}

	return (
		<Card {...props}>
			<Stack height="100%">
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
				<CardContent sx={{ paddingTop: 2, flexGrow: 1 }}>
					<Stack
						direction="row"
						justifyContent="space-between"
						height="100%"
					>
						<Stack
							minWidth="400px"
							height="100%"
							gap={2}
							justifyContent="space-between"
						>
							<Stack gap={2}>
								<Stack
									direction="row"
									justifyContent="space-between"
								>
									<Typography
										variant="M20"
										color="textSecondary"
									>
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
									<Typography
										variant="M20"
										color="textSecondary"
									>
										Дата:
									</Typography>
									<Typography variant="M20">
										{bill.date}
									</Typography>
								</Stack>
							</Stack>

							<Stack
								direction="row"
								justifyContent="space-between"
							>
								<Typography
									variant="M20"
									color="textSecondary"
								>
									Статус:
								</Typography>
								<Typography
									variant="M20"
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
							minWidth="348px"
						>
							<BillDocuments bill={bill} />
						</Stack>
					</Stack>
				</CardContent>
			</Stack>
		</Card>
	);
};

export default BillCard;
