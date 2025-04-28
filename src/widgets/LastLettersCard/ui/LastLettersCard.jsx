import { Card, CardContent, Typography } from '@mui/material';
import { Grid } from '@mui/system';
import { LettersSlider } from 'entities/Letter';

const LastLettersCard = ({ ...props }) => {
	return (
		<Card
			{...props}
			sx={{
				paddingRight: '0',
			}}
		>
			<CardContent sx={{ paddingBottom: '16px !important' }}>
				<Grid container>
					<Grid size={3}>
						<Typography variant="M24">
							Ваши&nbsp;последние письма
						</Typography>
					</Grid>
					<Grid size={9}>
						<LettersSlider />
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default LastLettersCard;
