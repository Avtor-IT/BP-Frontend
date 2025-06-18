import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useMaxWidth } from 'shared/model';

const DocsToApprove = ({ ...props }) => {
	const breakpoints = useMaxWidth();

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
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Typography
					color="tertiary"
					variant={breakpoints.md ? 'R16' : 'R20'}
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
