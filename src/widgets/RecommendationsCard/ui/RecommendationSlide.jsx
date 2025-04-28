import {
	Card,
	CardContent,
	CardHeader,
	Stack,
	Typography,
} from '@mui/material';

const RecommendationSlide = (props) => {
	return (
		<Card {...props}>
			<CardHeader
				title={'Обновления в налоговом законодательстве'}
				titleTypographyProps={{ variant: 'M20' }}
				sx={{
					padding: '16px !important',
					paddingBottom: '0 !important',
				}}
			/>
			<CardContent sx={{ padding: '16px !important' }}>
				<Stack gap={2}>
					<Typography variant="R16">
						С 2024 года изменились ставки налога на прибыль для
						малого бизнеса. Ознакомьтесь с новыми ставками и
						правилами расчета налога, чтобы оптимизировать налоговые
						отчисления.
					</Typography>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default RecommendationSlide;
