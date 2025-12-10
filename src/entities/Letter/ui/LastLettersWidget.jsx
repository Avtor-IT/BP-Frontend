import { Card, CardContent, Skeleton, Typography } from '@mui/material';
import { Grid } from '@mui/system';
import { useMaxWidth } from 'shared/model';
import LastLettersWidgetLg from './LastLettersWidgetLg';
import LettersSlider from './slider/LettersSlider';
import useLetters from '../api/getLetters';

const LastLettersWidget = (props) => {
	const breakpoints = useMaxWidth();

	const { data: letters, isLoading, isError } = useLetters();

	if (isLoading) {
		return (
			<Skeleton
				variant="rounded"
				{...props}
			/>
		);
	}

	if (breakpoints.lg) {
		return <LastLettersWidgetLg {...props} />;
	}

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
							{letters.length
								? 'Ваши последние письма'
								: 'Пока писем нет'}
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
