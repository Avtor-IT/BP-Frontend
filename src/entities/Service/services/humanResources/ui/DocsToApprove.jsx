import { Card, CardContent, CardHeader, Typography } from '@mui/material';

const DocsToApprove = ({ ...props }) => {
	return (
		<Card
			{...props}
			sx={{ display: 'flex', flexDirection: 'column', ...props.sx }}
		>
			<CardHeader title="Документы на&nbsp;утверждение" />

			<CardContent
				sx={{
					flexGrow: 1,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Typography
					color="textSecondary"
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

export default DocsToApprove;
