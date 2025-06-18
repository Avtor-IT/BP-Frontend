import {
	Card,
	CardContent,
	CardHeader,
	Skeleton,
	Stack,
	Typography,
} from '@mui/material';
import { BillActionCard } from 'entities/Bill/index.js';
import { useMaxWidth } from 'shared/model/index.js';
import { statusColor, statusName } from '../model/billStatus';
import BillDocuments from './BillDocuments.jsx';

const BillCardSmall = ({ bill, loading, ...props }) => {
	const breakpoints = useMaxWidth();

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
			sx={{
				color: 'textPrimary.default',
				paddingBlock: breakpoints.lg ? 2 : undefined,
				...props.sx,
			}}
		>
			<CardHeader
				title={bill.serviceName}
				action={
					<Typography
						variant={breakpoints.lg ? 'M16' : 'M20'}
						color="tertiary.main"
					>
						{bill.category}
					</Typography>
				}
				sx={{
					paddingBottom: 0,
					paddingInline: breakpoints.lg ? 2 : undefined,
				}}
			/>

			<CardContent
				sx={{
					paddingInline: breakpoints.lg ? 2 : undefined,
				}}
			>
				<Stack
					direction={breakpoints.lg ? 'column' : 'row'}
					justifyContent="space-between"
					alignItems="stretch"
					height="100%"
					gap={3}
				>
					<Stack
						maxWidth={breakpoints.lg ? 265 : undefined}
						flexGrow={1.5}
						gap={2}
						justifyContent="space-between"
					>
						<Stack gap={2}>
							<Stack
								direction="row"
								justifyContent="space-between"
							>
								<Typography
									variant={breakpoints.lg ? 'M16' : 'M20'}
									color={
										breakpoints.lg ? 'tertiary' : undefined
									}
								>
									Сумма к оплате:
								</Typography>
								<Typography
									variant={breakpoints.lg ? 'M16' : 'M20'}
								>
									{bill.sum}
								</Typography>
							</Stack>

							<Stack
								direction="row"
								justifyContent="space-between"
							>
								<Typography
									variant={breakpoints.lg ? 'M16' : 'M20'}
									color={
										breakpoints.lg ? 'tertiary' : undefined
									}
								>
									Дата:
								</Typography>
								<Typography
									variant={breakpoints.lg ? 'M16' : 'M20'}
								>
									{bill.date}
								</Typography>
							</Stack>
						</Stack>

						<Stack
							direction="row"
							justifyContent="space-between"
						>
							<Typography
								variant={breakpoints.lg ? 'M16' : 'M20'}
								color={breakpoints.lg ? 'tertiary' : undefined}
							>
								Статус:
							</Typography>
							<Typography
								variant={breakpoints.lg ? 'M16' : 'M20'}
								color={statusColor[bill.status]}
							>
								{statusName[bill.status]}
							</Typography>
						</Stack>
					</Stack>

					<Stack
						height="100%"
						gap={1}
						justifyContent={breakpoints.lg ? 'start' : 'end'}
						flexGrow={breakpoints.xl ? 0 : 1}
						width={
							breakpoints.xl && !breakpoints.lg ? '300px' : 'auto'
						}
						direction={
							breakpoints.lg && !breakpoints.md ? 'row' : 'column'
						}
						flexWrap="wrap"
					>
						<BillDocuments bill={bill} />
					</Stack>
				</Stack>

				<BillActionCard
					bill={bill}
					loading={loading}
				/>
			</CardContent>
		</Card>
	);
};

export default BillCardSmall;
