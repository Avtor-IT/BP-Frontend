import { Card, CardHeader } from '@mui/material';
import { useMaxWidth } from 'shared/model';
import LettersSlider from './slider/LettersSlider';

const LastLettersWidgetLg = (props) => {
	const breakpoints = useMaxWidth();
	return (
		<Card
			{...props}
			sx={{
				paddingTop: 2,
				paddingBottom: 1,
				position: 'relative',
				gap: 1,
				minHeight: breakpoints.md ? 324 : undefined,
				...props.sx,
			}}
		>
			<CardHeader
				title={<>Ваши&nbsp;последние письма</>}
				slotProps={{
					title: {
						variant: 'M20',
						color: 'textPrimary.default',
					},
				}}
				sx={{ paddingInline: 2 }}
			/>

			<LettersSlider />
		</Card>
	);
};

export default LastLettersWidgetLg;
