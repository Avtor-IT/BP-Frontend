import { Card, CardContent, CardHeader } from '@mui/material';
import { CircledTitle } from 'shared/ui/CircledTitle';

const gradient = 'linear-gradient(15deg, #514996 10%, #FFF 40%)';

const ReportsCard = ({ reportsTitle, children, ...props }) => {
	return (
		<Card
			{...props}
			sx={{ minHeight: '100%' }}
		>
			<CardHeader
				title={
					<CircledTitle
						title={reportsTitle || 'Отчеты'}
						color="secondary.main"
						fullWidth
						slotProps={{
							circle: {
								sx: { background: gradient },
							},
						}}
					/>
				}
			/>

			<CardContent sx={{ pt: 2 }}>{children}</CardContent>
		</Card>
	);
};

export default ReportsCard;
