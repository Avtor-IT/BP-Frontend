import { Grid } from '@mui/material';
import { useMaxWidth } from 'shared/model';
import BillActionCard from './BillActionCard';
import BillCardSmall from './BillCard.small';
import BillContentCard from './BillContentCard';

const BillCard = ({ bill, loading }) => {
	const breakpoints = useMaxWidth();

	if (breakpoints.xxl) {
		return (
			<BillCardSmall
				bill={bill}
				loading={loading}
			/>
		);
	}

	return (
		<Grid
			container
			columns={{ xxxl: 4, xs: 5 }}
			spacing={2}
		>
			<Grid size={{ xxxl: 3, xs: 4 }}>
				<BillContentCard
					sx={{ height: '100%' }}
					bill={bill}
					loading={loading}
				/>
			</Grid>
			<Grid size={1}>
				<BillActionCard
					sx={{ height: '100%' }}
					bill={bill}
					loading={loading}
				/>
			</Grid>
		</Grid>
	);
};

export default BillCard;
