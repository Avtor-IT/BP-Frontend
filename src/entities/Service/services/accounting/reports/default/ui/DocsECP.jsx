import { Card, CardContent, CardHeader, Typography } from '@mui/material';

const DocsEcp = ({ ...props }) => {
	return (
		<Card
			{...props}
			sx={{ display: 'flex', flexDirection: 'column', ...props.sx }}
		>
			<CardHeader title="Документы на&nbsp;ЭЦП" />

			<CardContent
				sx={{
					flexGrow: 1,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Typography
					color="var(--tertiary)"
					variant="R20"
					sx={{
						display: 'block',
					}}
				>
					Документов нет
				</Typography>
			</CardContent>
		</Card>
	);
};

export default DocsEcp;
