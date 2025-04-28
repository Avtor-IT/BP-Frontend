import { Skeleton, Stack, Typography } from '@mui/material';
import { Grid } from '@mui/system';
import { useBills } from '../api/getBills';
import BillItem from './BillItem';

const BillList = () => {
	const { data: bills, isLoading, isError } = useBills();

	if (isLoading) {
		return (
			<Stack gap={3}>
				{Array.from({ length: 4 }).map((_, i) => (
					<Grid
						key={i}
						container
						columns={4}
						spacing={2}
					>
						<Grid size={3}>
							<Skeleton
								variant="rounded"
								height="284px"
							/>
						</Grid>
						<Grid size={1}>
							<Skeleton
								variant="rounded"
								height="284px"
							/>
						</Grid>
					</Grid>
				))}
			</Stack>
		);
	}

	if (isError) {
		return <Typography>Ошибка при загрузке счетов.</Typography>;
	}

	return (
		<Stack gap={3}>
			{bills.map((bill) => (
				<BillItem
					key={bill.id}
					bill={bill}
				/>
			))}
		</Stack>
	);
};

export default BillList;
