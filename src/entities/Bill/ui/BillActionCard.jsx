import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Typography,
} from '@mui/material';

import { Box } from '@mui/system';
import { DownloadFile } from 'shared/icons/DownloadFile';

const BillActionCard = ({ bill, ...props }) => {
	return (
		<Card {...props}>
			<CardHeader
				title="Услуга завершена"
				titleTypographyProps={{
					color: 'tertiary.main',
					variant: 'M24',
				}}
				sx={{ paddingBottom: 0 }}
			/>
			<CardContent sx={{ paddingTop: 2, paddingBottom: 3 }}>
				<Box
					sx={{
						paddingLeft: 1,
						borderLeft: '2px solid',
						borderColor: 'tertiary.main',
					}}
				>
					Благодарим за сотрудничество!
					<br />
					<br />
					Все этапы успешно завершены. Вы можете скачать документы или
					оставить отзыв о нашей работе.
				</Box>
			</CardContent>
			<CardActions sx={{ paddingTop: 0 }}>
				<Button
					fullWidth
					color="secondary"
					variant="card"
					startIcon={<DownloadFile color="secondary" />}
				>
					<Typography
						variant="M20"
						color="inherit"
					>
						Оставить отзыв
					</Typography>
				</Button>
			</CardActions>
		</Card>
	);
};

export default BillActionCard;
