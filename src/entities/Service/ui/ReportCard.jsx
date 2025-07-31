import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useMaxWidth } from 'shared/model';
import { createAdditioinalSx } from 'shared/mui';

const ReportCard = ({
	children,
	description,
	reportTitle,
	slotProps,
	...props
}) => {
	const breakpoints = useMaxWidth();

	return (
		<Card
			{...props}
			sx={createAdditioinalSx(
				{
					position: 'relative',
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
				},
				props.sx
			)}
		>
			<CardHeader
				title={reportTitle}
				{...slotProps?.header}
			/>

			<CardContent
				{...slotProps?.content}
				sx={createAdditioinalSx(
					{
						position: 'relative',
						flexGrow: 1,
					},
					slotProps?.content?.sx
				)}
			>
				{children || (
					<Typography
						variant={breakpoints.md ? 'R16' : 'R20'}
						{...slotProps?.description}
						sx={createAdditioinalSx(
							{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								width: '100%',
								textAlign: 'center',
								display: 'block',
								color: 'tertiary',
							},
							slotProps?.description?.sx
						)}
					>
						{description}
					</Typography>
				)}
			</CardContent>
		</Card>
	);
};

export default ReportCard;
