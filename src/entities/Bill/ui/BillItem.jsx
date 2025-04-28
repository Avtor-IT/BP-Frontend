import { Grid } from '@mui/system';
import BillActionCard from './BillActionCard';
import BillCard from './BillCard';

const BillItem = ({ bill }) => {
	return (
		<Grid
			container
			columns={4}
			spacing={2}
		>
			<Grid
				size={3}
				minHeight="284px"
			>
				<BillCard
					sx={{ height: '100%' }}
					bill={bill}
				/>
			</Grid>
			<Grid
				size={1}
				minHeight="284px"
			>
				<BillActionCard
					sx={{ height: '100%' }}
					bill={bill}
				/>
			</Grid>
		</Grid>
	);
};

export default BillItem;
