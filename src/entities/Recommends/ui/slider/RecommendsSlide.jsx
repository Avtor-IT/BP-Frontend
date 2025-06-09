import { Card, CardHeader, Typography } from '@mui/material';
import { useMinWidth } from 'shared/model/index.js';
import { TextBox } from 'shared/ui/TextBox/index.js';

const RecommendsSlide = (props) => {
	const breakpoints = useMinWidth();

	return (
		<Card
			{...props}
			sx={{
				display: 'flex !important',
				gap: 1,
				paddingBlock: breakpoints.md ? 2 : undefined,
				...props.sx,
			}}
		>
			<CardHeader
				title="Обновления в налоговом законодательстве"
				slotProps={{ title: { variant: 'M20' } }}
				sx={{ paddingInline: breakpoints.md ? 2 : undefined }}
			/>
			<TextBox
				height="100%"
				offsetX={breakpoints.md ? 2 : undefined}
			>
				<Typography variant="R16">
					С 2024 года изменились ставки налога на прибыль для малого
					бизнеса. Ознакомьтесь с новыми ставками и правилами расчета
					налога, чтобы оптимизировать налоговые отчисления.
				</Typography>
			</TextBox>
		</Card>
	);
};

export default RecommendsSlide;
