import { Card, CardContent, Typography } from '@mui/material';
import { Grid } from '@mui/system';
import LettersSlider from './slider/LettersSlider';

const LastLettersWidget = (props) => {
	return (
		<Card
			{...props}
			sx={{
				paddingRight: 0,
				paddingBottom: 2,
				position: 'relative',
				...props.sx,
			}}
		>
			<Grid
				container
				columnSpacing={2}
			>
				<Grid size={{ xxxl: 3, xs: 4 }}>
					<CardContent>
						<Typography variant="M24">
							Ваши&nbsp;последние письма
						</Typography>
					</CardContent>
				</Grid>
				<Grid
					size={'grow'}
					sx={{
						overflowX: 'clip',
						// paddingInline: 1,
					}}
				>
					<LettersSlider />
				</Grid>
			</Grid>
		</Card>
	);
};

export default LastLettersWidget;
